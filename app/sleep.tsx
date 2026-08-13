/**
 * Sleep Mode Screen
 * Reuses existing microphone, Whisper transcription, and OpenAI chat from Session screen
 * Features: Voice input, AI responses, dark theme
 */

import { ScrollView, Text, View, TextInput, TouchableOpacity, Platform, ActivityIndicator, KeyboardAvoidingView, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAppContext } from "@/lib/app-context";
import { useOpenAI } from "@/lib/openai-context";
import { getOpenAIClient } from "@/lib/openai-service";
import { useTranslation } from "@/lib/i18n";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { useState, useEffect, useRef } from "react";
import { getApiBaseUrl } from "@/constants/oauth";
import * as FileSystem from "expo-file-system/legacy";


export default function SleepModeScreen() {
  const { audioEnabled, language, theme } = useAppContext();
  const { messages, isLoading, error, sendMessage, startNewSession } = useOpenAI();
  const { t } = useTranslation(language);
  const router = useRouter();
  const colors = useColors();


  // Audio recording - reuse existing expo-av Audio.Recording system
  const recordingRef = useRef<Audio.Recording | null>(null);
  const recordingStartTimeRef = useRef<number>(0);

  const [inputValue, setInputValue] = useState("");
  const [sessionInitialized, setSessionInitialized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Initialize audio mode on mount
  useEffect(() => {
    const initAudio = async () => {
      try {
        const permission = await Audio.requestPermissionsAsync();
        if (!permission.granted) {
          setPermissionError("Microphone permission was denied");
          return;
        }

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.error("[SleepMode] Failed to initialize audio:", error);
        setPermissionError("Failed to initialize audio");
      }
    };
    initAudio();
  }, []);

  // Initialize session with sleep mode greeting
  useEffect(() => {
    if (!sessionInitialized) {
      startNewSession("sleep");
      setSessionInitialized(true);
    }
  }, [sessionInitialized, startNewSession]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollViewRef.current && messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Handle send message - reuse existing OpenAI sendMessage
  const handleSend = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) {
      return;
    }

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

    setInputValue("");
    await sendMessage(trimmedInput);
  };

  // Format timestamp
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Handle microphone button press - REUSE EXACT LOGIC FROM SESSION SCREEN
  const handleMicrophonePress = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (!isListening) {
      // START RECORDING
      try {
        const recording = new Audio.Recording();
        
        await recording.prepareToRecordAsync({
          isMeteringEnabled: true,
          android: {
            extension: ".m4a",
            outputFormat: Audio.AndroidOutputFormat.MPEG_4,
            audioEncoder: Audio.AndroidAudioEncoder.AAC,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
          },
          ios: {
            extension: ".m4a",
            audioQuality: Audio.IOSAudioQuality.HIGH,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
          },
          web: {} as any,
        });

        await recording.startAsync();
        recordingRef.current = recording;
        recordingStartTimeRef.current = Date.now();
        setIsListening(true);
        setPermissionError(null);
        setTranscriptionError(null);
      } catch (error) {
        console.error("[SleepMode] ❌ Failed to start recording:", error);
        setPermissionError("Failed to start recording");
      }
    } else {
      // STOP RECORDING
      try {
        if (!recordingRef.current) {
          setPermissionError("No active recording");
          return;
        }

        await recordingRef.current.stopAndUnloadAsync();
        const uri = recordingRef.current.getURI();
        recordingRef.current = null;
        setIsListening(false);


        if (uri) {
          await handleTranscribeRecording(uri);
        } else {
          console.error("[SleepMode] ❌ No URI returned from recording");
          setPermissionError("Failed to get recording URI");
        }

        if (Platform.OS !== "web") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      } catch (error) {
        console.error("[SleepMode] ❌ Failed to stop recording:", error);
        setPermissionError("Failed to stop recording");
      }
    }
  };

  // Handle transcription of recorded audio - REUSE EXACT LOGIC FROM SESSION SCREEN
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
      }
    );

    if (uploadResult.status < 200 || uploadResult.status >= 300) {
      throw new Error(
        `Transcription request failed: ${uploadResult.status} ${uploadResult.body}`
      );
    }

    const transcriptionData = JSON.parse(uploadResult.body) as {
      text?: string;
    };

    const transcribedText = transcriptionData.text?.trim();

    if (!transcribedText) {
      throw new Error("Transcription service returned no text");
    }

    setInputValue(transcribedText);
  } catch (error) {
    console.error("[SleepMode] ❌ Transcription failed:", error);

    setTranscriptionError(
      error instanceof Error ? error.message : "Transcription failed"
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
      className="flex-1 bg-background"
    >
        {/* Header */}
        <View
  style={{
    paddingTop: 52,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor:
  theme === "dark"
    ? "rgba(255,255,255,0.10)"
    : "rgba(10,126,164,0.12)",
  }}
>
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <View style={{ width: 44 }} />

    <View
  style={{
    flex: 1,
    alignItems: "center",
    marginLeft: -10,
  }}
>
      <Text className="text-2xl font-bold text-foreground">
        {t("sleep.title")}
      </Text>

      <Text className="text-xs text-muted mt-0.5">
        {t("sleep.subtitle")}
      </Text>
    </View>

    <TouchableOpacity
  onPress={handleClose}
  style={{
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      theme === "dark"
        ? "rgba(0, 217, 255, 0.12)"
        : "rgba(10, 126, 164, 0.10)",
    borderWidth: 1.5,
    borderColor:
      theme === "dark"
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
      backgroundColor:
        theme === "dark"
          ? "rgba(255, 255, 255, 0.04)"
          : "rgba(255, 255, 255, 0.25)",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      opacity: 0.6,
      pointerEvents: "none",
    }}
  />

  <Text style={{ fontSize: 22, lineHeight: 26, zIndex: 10 }}>
    ❌
  </Text>
</TouchableOpacity>
  </View>
</View>

        {/* Error message */}
        {error && (
          <View className="mx-4 mt-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
            <Text className="text-sm text-red-300">{error}</Text>
          </View>
        )}

        {/* Permission error message */}
        {permissionError && (
          <View className="mx-4 mt-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
            <Text className="text-sm text-red-300">
              {permissionError || t('session.microphoneAccessRequired')}
            </Text>
          </View>
        )}

        {/* Transcription error message */}
        {transcriptionError && (
          <View className="mx-4 mt-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
            <Text className="text-sm text-red-300">{transcriptionError}</Text>
          </View>
        )}

        {/* Transcription in progress indicator */}
        {isTranscribing && (
          <View className="mx-4 mt-3 p-3 bg-blue-900/20 border border-blue-800 rounded-lg flex-row items-center gap-2">
            <ActivityIndicator size="small" color="#60a5fa" />
            <Text className="text-sm text-blue-300 font-semibold">{t('session.transcriberIndicator')}</Text>
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
              <Text className="text-base text-slate-400 text-center">
                {t('sleep.emptyState')}
              </Text>
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
                      ? "bg-blue-900 rounded-br-none"
                      : "bg-slate-800 border border-slate-700 rounded-bl-none"
                  )}
                >
                  <Text
                    className={cn(
                      "text-base leading-relaxed",
                      msg.role === "user" ? "text-slate-100" : "text-slate-200"
                    )}
                  >
                    {msg.content}
                  </Text>
                  <Text
                    className={cn(
                      "text-xs mt-1",
                      msg.role === "user" ? "text-slate-300" : "text-slate-500"
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
              <View className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-none px-4 py-3">
                <ActivityIndicator size="small" color="#60a5fa" />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input area */}
        <View className="px-4 py-4 border-t border-slate-800">
          {/* Listening indicator */}
          {isListening && (
            <View className="mb-3 flex-row items-center gap-2 px-3 py-2 bg-blue-900/30 rounded-lg border border-blue-800">
              <Text className="text-sm text-blue-300 font-semibold">{t('session.listeningIndicator')}</Text>
            </View>
          )}
          <View className="flex-row items-center gap-2">
            <TextInput
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-full text-slate-100"
              placeholder={t('sleep.placeholder')}
              placeholderTextColor="#64748b"
              value={inputValue}
              onChangeText={setInputValue}
              editable={!isLoading}
              multiline
              maxLength={1000}
            />
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
    shadowColor: isListening
      ? colors.primary
      : theme === "dark"
      ? "#00D9FF"
      : "#0a7ea4",
    shadowOpacity: isListening
      ? 0.4
      : theme === "dark"
      ? 0.25
      : 0.15,
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

  <Text style={{ fontSize: 20, lineHeight: 24, zIndex: 10 }}>
    🎤
  </Text>
</TouchableOpacity>
            <TouchableOpacity
  onPress={handleSend}
  disabled={isLoading || !inputValue.trim()}
  style={{
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      isLoading || !inputValue.trim()
        ? "rgba(0, 0, 0, 0.2)"
        : colors.primary,
    borderWidth: 1.5,
    borderColor:
      isLoading || !inputValue.trim()
        ? "rgba(0, 0, 0, 0.1)"
        : colors.primary,
    shadowColor:
      isLoading || !inputValue.trim()
        ? "#000000"
        : colors.primary,
    shadowOpacity:
      isLoading || !inputValue.trim()
        ? 0.1
        : 0.3,
    shadowRadius:
      isLoading || !inputValue.trim()
        ? 4
        : 8,
    shadowOffset: { width: 0, height: 2 },
    elevation:
      isLoading || !inputValue.trim()
        ? 1
        : 4,
    opacity:
      isLoading || !inputValue.trim()
        ? 0.6
        : 1,
  }}
>
  <View
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "40%",
      backgroundColor:
        isLoading || !inputValue.trim()
          ? "rgba(255, 255, 255, 0.02)"
          : "rgba(255, 255, 255, 0.2)",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      opacity: 0.6,
      pointerEvents: "none",
    }}
  />

  <Text
    style={{
      fontSize: 20,
      lineHeight: 24,
      zIndex: 10,
      color:
        isLoading || !inputValue.trim()
          ? colors.muted
          : "#ffffff",
    }}
  >
    {isLoading ? "⏳" : "📤"}
  </Text>
</TouchableOpacity>
          </View>
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}
