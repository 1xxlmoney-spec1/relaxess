import { View, Text, Pressable, Platform, Animated } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAppContext } from "@/lib/app-context";
import { useTranslation } from "@/lib/i18n";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import { useSimpleAudio } from "@/hooks/use-simple-audio";
import { AUDIO_TRACKS } from "@/lib/_core/audio-manager";

import * as Haptics from "expo-haptics";

export default function QuietModeScreen() {
  const { language, audioEnabled, session, theme } =
    useAppContext();
  const { t } = useTranslation(language);
  const router = useRouter();
  const colors = useColors();
  const { play, stop, currentTrackId } = useSimpleAudio();

  // Controls are always visible - no auto-hide logic

  const handleAudioTrackChange = (track: "relaxm2" | "forest" | "rain") => {
    if (!session.isPremium && track !== "relaxm2") return;
    
    const trackData = AUDIO_TRACKS[track];
    if (!trackData) {
      console.error(`Track not found: ${track}`);
      return;
    }

    if (currentTrackId === track) {
      stop();
    } else {
      play(track, trackData.s3Url, session.isPremium);
    }
    
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleExit = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const AUDIO_OPTIONS = [
    { id: "relaxm2", label: "Music", icon: "🎵" },
    { id: "forest", label: "Forest", icon: "🌲" },
    { id: "rain", label: "Rain", icon: "🌧️" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScreenContainer className="bg-background items-center justify-center">
        {/* Background Animation */}
        <View className="absolute inset-0 flex-1 items-center justify-center">
          <Animated.View
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: colors.primary,
              opacity: 0.1,
            }}
          />
        </View>

        {/* Content */}
        <View className="flex-1 items-center justify-center px-6 gap-8">
          <Text className="text-4xl font-bold text-foreground text-center">
            {t("quiet.title")}
          </Text>
          <Text className="text-lg text-muted text-center leading-relaxed">
            {t("quiet.description")}
          </Text>
        </View>

        {/* Controls - Always Visible */}
        <View
          className="absolute bottom-0 left-0 right-0 px-6 py-8 gap-4"
        >
            {/* Audio Track Selection */}
            {session.isPremium && (
              <View className="gap-3">
                <Text className="text-sm font-semibold text-muted text-center uppercase">
                  {t("session.audioLabel")}
                </Text>
                <View className="flex-row gap-3 justify-center">
                  {AUDIO_OPTIONS.map((option) => {
                    const isActive = currentTrackId === option.id;
                    return (
                      <Pressable
                        key={option.id}
                        onPress={() =>
                          handleAudioTrackChange(option.id as "relaxm2" | "forest" | "rain")
                        }
                        style={({ pressed }) => ({
                          opacity: pressed ? 0.9 : 1,
                          transform: [{ scale: pressed ? 0.94 : 1 }],
                          borderRadius: 12,
                          backgroundColor: isActive
                            ? theme === "dark"
                              ? "rgba(0, 217, 255, 0.20)"
                              : "rgba(10, 126, 164, 0.15)"
                            : theme === "dark"
                            ? "rgba(0, 217, 255, 0.12)"
                            : "rgba(10, 126, 164, 0.10)",
                          borderWidth: 1.5,
                          borderColor: isActive
                            ? theme === "dark"
                              ? "rgba(0, 217, 255, 0.60)"
                              : "rgba(10, 126, 164, 0.50)"
                            : theme === "dark"
                            ? "rgba(0, 217, 255, 0.40)"
                            : "rgba(10, 126, 164, 0.35)",
                          shadowColor: theme === "dark" ? "#00D9FF" : "#0a7ea4",
                          shadowOpacity: isActive
                            ? theme === "dark"
                              ? 0.35
                              : 0.25
                            : theme === "dark"
                            ? 0.25
                            : 0.15,
                          shadowRadius: 8,
                          shadowOffset: { width: 0, height: 2 },
                          elevation: 4,
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          justifyContent: "center",
                          alignItems: "center",
                        })}
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
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 12,
                            opacity: 0.6,
                            pointerEvents: "none",
                          }}
                        />
                        <Text style={{ fontSize: 14, fontWeight: "600", color: theme === "dark" ? "#FFFFFF" : colors.foreground, zIndex: 10 }}>
                          {option.icon} {option.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Exit Button */}
            <Pressable
              onPress={handleExit}
              style={({ pressed }) => ({
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.94 : 1 }],
                borderRadius: 12,
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
                paddingVertical: 12,
                paddingHorizontal: 24,
                alignItems: "center",
                justifyContent: "center",
              })}
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
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                  opacity: 0.6,
                  pointerEvents: "none",
                }}
              />
              <Text style={{ fontSize: 16, fontWeight: "600", color: theme === "dark" ? "#FFFFFF" : colors.foreground, zIndex: 10 }}>
                {t("common.close")}
              </Text>
            </Pressable>
        </View>
      </ScreenContainer>
    </View>
  );
}
