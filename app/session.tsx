/**
 * Session Screen - AI Chat with Emotional Support
 * Features: Context-aware responses, message history, audio playback
 */

import { ScreenContainer } from "@/components/screen-container";
import { useAppContext } from "@/lib/app-context";
import { useOpenAI } from "@/lib/openai-context";
import { getOpenAIClient } from "@/lib/openai-service";
import { useTranslation } from "@/lib/i18n";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import { useAudio } from "@/lib/audio-context";

import { cn } from "@/lib/utils";
import * as Haptics from "expo-haptics";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
} from "expo-audio";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { useState, useEffect, useRef } from "react";
import { getApiBaseUrl } from "@/constants/oauth";
import * as FileSystem from "expo-file-system/legacy";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";


export default function SessionScreen() {
  const { theme, language, session, audioEnabled } = useAppContext();
  const { messages, isLoading, error, sendMessage, startNewSession, messagesRemainingToday } = useOpenAI();
  const { t } = useTranslation(language);
  const router = useRouter();
  const colors = useColors();
  const audio = useAudio();

  // Audio recording - using expo-audio
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const [inputValue, setInputValue] = useState("");
  const [sessionInitialized, setSessionInitialized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  // Initialize microphone permission and audio mode on mount
  useEffect(() => {
    const initAudio = async () => {
      try {
        const permission = await AudioModule.requestRecordingPermissionsAsync();
        if (!permission.granted) {
          setPermissionError("Microphone permission was denied");
          return;
        }

        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        });
      } catch (error) {
        console.error("Failed to initialize audio:", error);
        setPermissionError("Failed to initialize audio");
      }
    };

    initAudio();
  }, []);

  // Initialize session with mood and greeting
  useEffect(() => {
    if (!sessionInitialized && session.selectedMood) {
      startNewSession(session.selectedMood);
      setSessionInitialized(true);
    }
  }, [session.selectedMood, sessionInitialized, startNewSession]);

  // Audio auto-play removed - audio system in stub mode

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollViewRef.current && messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Handle send message
  const handleSend = async () => {
    const trimmedInput = inputValue.trim();
    // Prevent send if already loading or request in progress
    if (!trimmedInput || isLoading) {
      return;
    }

    // Check if OpenAI client is already processing a request
    try {
      const openaiClient = getOpenAIClient();
      if (openaiClient.isRequestInProgress()) {
        return;
      }
    } catch (err) {
      // Client not initialized yet, continue
    }

    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Clear input
    setInputValue("");

    // Send message
    await sendMessage(trimmedInput);

    // Increment audio session exchange count for free tier tracking
    audio.incrementExchangeCount();
  };

  // Format timestamp
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Handle microphone button press - start/stop recording
  const handleMicrophonePress = async () => {
     if (isTranscribing) {
     return;
    }
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (!isListening) {
      try {
        setPermissionError(null);
        setTranscriptionError(null);

        await audioRecorder.prepareToRecordAsync();
        audioRecorder.record();
        setIsListening(true);
      } catch (error) {
        console.error("[Session] ❌ Failed to start recording:", error);
        setPermissionError("Failed to start recording");
      }
      return;
    }

    try {
      await audioRecorder.stop();
      setIsListening(false);

      const uri = audioRecorder.uri;
      if (!uri) {
        console.error("[Session] ❌ No URI returned from recording");
        setPermissionError("Failed to get recording URI");
        return;
      }

      const info = await FileSystem.getInfoAsync(uri);
      console.log("[Session] Recording file info:", info);

      if (!info.exists || !("size" in info) || !info.size) {
        throw new Error("Recorded audio file is empty");
      }

      await handleTranscribeRecording(uri);

      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.error("[Session] ❌ Failed to stop recording:", error);
      setIsListening(false);
      setPermissionError(
        error instanceof Error ? error.message : "Failed to stop recording",
      );
    }
  };

  // Handle transcription of recorded audio
  const handleTranscribeRecording = async (recordingUri: string) => {
    try {
      setIsTranscribing(true);
      setTranscriptionError(null);

      const uploadResult = await FileSystem.uploadAsync(
        `${getApiBaseUrl()}/api/transcribe`,
        recordingUri,
        {
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "file",
          mimeType: "audio/x-m4a",
        },
      );

      if (uploadResult.status < 200 || uploadResult.status >= 300) {
        throw new Error(
          `Transcription request failed: ${uploadResult.status} ${uploadResult.body}`,
        );
      }

      const transcriptionData = JSON.parse(uploadResult.body) as { text?: string };
      const transcribedText = transcriptionData.text?.trim();

      if (!transcribedText) {
        throw new Error("Transcription service returned no text");
      }

      // Place transcribed text into input field
      setInputValue(transcribedText);
    } catch (error) {
      console.error("[Session] ❌ Transcription failed:", error);
      setTranscriptionError(
        error instanceof Error ? error.message : "Transcription failed",
      );
    } finally {
      setIsTranscribing(false);
    }
  };

  // Close session
  const handleClose = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  return (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >
    <ScreenContainer
      edges={["top", "left", "right"]}
      className={theme === "dark" ? "flex-1" : "flex-1 bg-background"}
    >
      <Animated.View entering={FadeIn.duration(300)} style={{ flex: 1 }}>
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-border">
            <View className="flex-1">
              <Text className="text-lg font-semibold text-foreground">{t("session.title")}</Text>
              <Text className="text-xs text-muted mt-0.5">
                {session.isPremium
                  ? t("session.premiumUser")
                  : t("session.messagesRemaining", { count: messagesRemainingToday.toString() })}  
              </Text>
            </View>


            {/* Close button - emoji style */}
            <TouchableOpacity
              onPress={handleClose}
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme === "dark"
                  ? "rgba(0, 217, 255, 0.12)"
                  : "rgba(10, 126, 164, 0.10)",
                borderWidth: 1.5,
                borderColor: theme === "dark"
                  ? "rgba(0, 217, 255, 0.40)"
                  : "rgba(10, 126, 164, 0.35)",
                shadowColor: theme === "dark" ? "#00D9FF" : "#0a7ea4",
                shadowOpacity: theme === "dark" ? 0.25 : 0.15,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: 4,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "40%",
                  backgroundColor: theme === "dark"
                    ? "rgba(255, 255, 255, 0.04)"
                    : "rgba(255, 255, 255, 0.25)",
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  opacity: 0.6,
                  pointerEvents: "none",
                }}
              />
              <Text style={{ fontSize: 22, lineHeight: 26, zIndex: 10 }}>❌</Text>
            </TouchableOpacity>
          </View>

          {/* Error / free limit message */}
          {error && (
          <View
             className={
             error === 'Daily message limit reached. Try again tomorrow.'
                 ? "mx-4 mt-3 p-3 bg-primary/10 border border-primary rounded-lg"
                 : "mx-4 mt-3 p-3 bg-error/10 border border-error rounded-lg"
          }
        >
          <Text
            className={
            error === 'Daily message limit reached. Try again tomorrow.'
                 ? "text-sm text-primary font-semibold"
                 : "text-sm text-error"
          }
        >
          {error === 'Daily message limit reached. Try again tomorrow.'
                 ? t('session.messageLimitReached')
                 : error}
          </Text>
            </View>
          )}

          {/* Permission error message */}
          {permissionError && (
            <View className="mx-4 mt-3 p-3 bg-error/10 border border-error rounded-lg">
              <Text className="text-sm text-error">
                {permissionError || t('session.microphoneAccessRequired')}
              </Text>
            </View>
          )}

          {/* Transcription error message */}
          {transcriptionError && (
            <View className="mx-4 mt-3 p-3 bg-error/10 border border-error rounded-lg">
              <Text className="text-sm text-error">{transcriptionError}</Text>
            </View>
          )}

          {/* Transcription in progress indicator */}
          {isTranscribing && (
            <View className="mx-4 mt-3 p-3 bg-primary/10 border border-primary rounded-lg flex-row items-center gap-2">
              <ActivityIndicator size="small" color={colors.primary} />
              <Text className="text-sm text-primary font-semibold">{t('session.transcriberIndicator')}</Text>
            </View>
          )}

          {/* Gentle Breathing limit notification */}
          {audio.limitNotification && (
            <View className="mx-4 mt-3 p-3 bg-warning/10 border border-warning rounded-lg flex-row items-center justify-between">
              <Text className="text-sm text-warning font-semibold flex-1">{audio.limitNotification}</Text>
              <TouchableOpacity onPress={audio.clearNotification} className="ml-2">
                <Text className="text-lg text-warning">✕</Text>
              </TouchableOpacity>
            </View>
          )}



          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-4 py-4"
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {messages.length === 0 ? (
              <View className="flex-1 items-center justify-center py-8">
                <Text className="text-base text-muted text-center">{t("session.startConversation")}</Text>
              </View>
            ) : (
              messages.map((msg, index) => (
                <Animated.View
                  key={msg.id}
                  className={cn("mb-4 flex-row", msg.role === "user" ? "justify-end" : "justify-start")}
                  entering={msg.role === "assistant" ? FadeIn.duration(400).delay(index * 50) : undefined}
                  layout={Layout.springify()}
                >
                  <View
                    className={cn(
                      "max-w-xs px-4 py-3 rounded-2xl",
                      msg.role === "user"
                        ? "bg-primary rounded-br-none"
                        : "bg-surface border border-border rounded-bl-none"
                    )}
                  >
                    <Text
                      className={cn(
                        "text-base leading-relaxed",
                        msg.role === "user" ? "text-background" : "text-foreground"
                      )}
                    >
                      {msg.content}
                    </Text>
                    <Text
                      className={cn(
                        "text-xs mt-1",
                        msg.role === "user" ? "text-background/70" : "text-muted"
                      )}
                    >
                      {formatTime(msg.timestamp)}
                    </Text>
                  </View>
                </Animated.View>
              ))
            )}

            {/* Loading indicator */}
            {isLoading && (
              <View className="flex-row items-center mb-4">
                <View className="bg-surface border border-border rounded-2xl rounded-bl-none px-4 py-3">
                  <ActivityIndicator size="small" color={colors.primary} />
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input area */}
          <View className="px-4 py-4 border-t border-border">
            {/* Listening indicator */}
            {isListening && (
              <View className="mb-3 flex-row items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg border border-primary">
                <Text className="text-sm text-primary font-semibold">{t('session.listeningIndicator')}</Text>
              </View>
            )}
            <View className="flex-row items-center gap-2">
              <TextInput
                className="flex-1 px-4 py-3 bg-surface border border-border rounded-full text-foreground"
                placeholder={t("session.messagePlaceholder")}
                placeholderTextColor={colors.muted}
                value={inputValue}
                onChangeText={setInputValue}
                editable={!isLoading}
                multiline
                maxLength={1000}
              />
              {/* Microphone button - emoji style */}
              <TouchableOpacity
                onPress={handleMicrophonePress}
                disabled={isLoading}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: isListening
                    ? colors.primary
                    : theme === "dark"
                    ? "rgba(0, 217, 255, 0.12)"
                    : "rgba(10, 126, 164, 0.10)",
                  borderWidth: 1.5,
                  borderColor: isListening
                    ? colors.primary
                    : theme === "dark"
                    ? "rgba(0, 217, 255, 0.40)"
                    : "rgba(10, 126, 164, 0.35)",
                  shadowColor: isListening ? colors.primary : theme === "dark" ? "#00D9FF" : "#0a7ea4",
                  shadowOpacity: isListening ? 0.4 : theme === "dark" ? 0.25 : 0.15,
                  shadowRadius: isListening ? 12 : 8,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: isListening ? 6 : 4,
                  opacity: isLoading ? 0.5 : 1,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "40%",
                    backgroundColor: isListening
                      ? "rgba(255, 255, 255, 0.2)"
                      : theme === "dark"
                      ? "rgba(255, 255, 255, 0.04)"
                      : "rgba(255, 255, 255, 0.25)",
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    opacity: 0.6,
                    pointerEvents: "none",
                  }}
                />
                <Text style={{ fontSize: 20, lineHeight: 24, zIndex: 10 }}>🎤</Text>
              </TouchableOpacity>

              {/* Send button - emoji style */}
              <TouchableOpacity
                onPress={handleSend}
                disabled={isLoading || !inputValue.trim()}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: isLoading || !inputValue.trim()
                    ? "rgba(0, 0, 0, 0.2)"
                    : colors.primary,
                  borderWidth: 1.5,
                  borderColor: isLoading || !inputValue.trim()
                    ? "rgba(0, 0, 0, 0.1)"
                    : colors.primary,
                  shadowColor: isLoading || !inputValue.trim() ? "#000000" : colors.primary,
                  shadowOpacity: isLoading || !inputValue.trim() ? 0.1 : 0.3,
                  shadowRadius: isLoading || !inputValue.trim() ? 4 : 8,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: isLoading || !inputValue.trim() ? 1 : 4,
                  opacity: isLoading || !inputValue.trim() ? 0.6 : 1,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "40%",
                    backgroundColor: isLoading || !inputValue.trim()
                      ? "rgba(255, 255, 255, 0.02)"
                      : "rgba(255, 255, 255, 0.2)",
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    opacity: 0.6,
                    pointerEvents: "none",
                  }}
                />
                <Text style={{ fontSize: 20, lineHeight: 24, zIndex: 10, color: isLoading || !inputValue.trim() ? colors.muted : "#ffffff" }}>
                  {isLoading ? "⏳" : "📤"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
              </Animated.View>
    </ScreenContainer>
  </KeyboardAvoidingView>
  );
}

