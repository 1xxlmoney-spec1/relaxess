import { Text, View, Platform, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAppContext } from "@/lib/app-context";
import { useTranslation } from "@/lib/i18n";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";
import { useState } from "react";

import { RelaxessHeader } from "@/components/relaxess-header";
import { PremiumMoodCard } from "@/components/premium-mood-card";
import { AnimatedGradientBg } from "@/components/animated-gradient-bg";

export default function HomeScreen() {
  const { theme, setTheme, language, setSelectedMood } = useAppContext();
  const { t } = useTranslation(language);
  const router = useRouter();
  const colors = useColors();
  const isDark = colors.background === "#0A1F2E" || colors.background === "#151718";
  const [selectedMood, setLocalSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (moodId: string) => {
    setLocalSelectedMood(moodId);
    setSelectedMood(moodId);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleStartSession = () => {
    if (!selectedMood) return;
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push("/session");
  };

  const handleRelaxationTools = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/relaxation-tools");
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <AnimatedGradientBg>
      <ScreenContainer
        className={theme === "dark" ? "" : "bg-transparent"}
      >
        <View
          style={{ flex: 1, flexDirection: "column", paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
        >

        {/* Header row — theme toggle + Relaxess title, positioned lower */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 48,
          marginBottom: 10,
          marginTop: 14,
        }}>
          <Pressable
            onPress={handleThemeToggle}
            style={({ pressed }) => ({
              width: 48,
              height: 48,
              borderRadius: 16,
              backgroundColor: theme === "dark"
                ? "rgba(0, 217, 255, 0.12)"
                : "rgba(10, 126, 164, 0.10)",
              borderWidth: 1.5,
              borderColor: theme === "dark"
                ? "rgba(0, 217, 255, 0.40)"
                : "rgba(10, 126, 164, 0.35)",
              justifyContent: "center",
              alignItems: "center",
              transform: [{ scale: pressed ? 0.94 : 1 }],
              shadowColor: theme === "dark" ? "#00D9FF" : "#0a7ea4",
              shadowOpacity: theme === "dark" ? 0.25 : 0.15,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 4,
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
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                opacity: 0.6,
                pointerEvents: "none",
              }}
            />
            <Text style={{ fontSize: 24, lineHeight: 28, zIndex: 10 }}>
              {theme === "dark" ? "☀️" : "🌙"}
            </Text>
          </Pressable>
          <RelaxessHeader />
        </View>

        {/* Title */}
        <View style={{ alignItems: "center", marginBottom: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: theme === "dark" ? "#FFFFFF" : "#11181C", textAlign: "center" }}>
            {t("home.title")}
          </Text>
          <View style={{ height: 3, width: 36, backgroundColor: colors.primary, borderRadius: 2, marginTop: 4 }} />
        </View>

        {/* Mood Grid — 2x3, rectangular cards, fixed height per row */}
        <View
          style={{ flex: 1, gap: 8, marginBottom: 10, minHeight: 0 }}
        >
          {[
            ["anxiety", "😰", "stress", "😔"],
            ["overthinking", "🤔", "sleep", "😴"],
            ["sadness", "😢", "relax", "🧘"],
          ].map(([id1, emoji1, id2, emoji2]) => (
            <View
              key={id1}
              style={{ flex: 1, flexDirection: "row", gap: 8 }}
            >
              <View
                style={{ flex: 1 }}
              >
                <PremiumMoodCard
                  isSelected={selectedMood === id1}
                  onPress={() => handleMoodSelect(id1)}
                  label={t(`home.mood.${id1}`)}
                  emoji={emoji1}
                />
              </View>
              <View
                style={{ flex: 1 }}
              >
                <PremiumMoodCard
                  isSelected={selectedMood === id2}
                  onPress={() => handleMoodSelect(id2)}
                  label={t(`home.mood.${id2}`)}
                  emoji={emoji2}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Buttons — fixed at bottom, not flex */}
        <View style={{ gap: 7, flexShrink: 0 }}>
          {/* Start Session Button with Glow Effect */}
          <View style={{ position: "relative" }}>
            {selectedMood && (
              <View
                style={{
                  position: "absolute",
                  inset: -2,
                  backgroundColor: colors.primary,
                  borderRadius: 28,
                  opacity: 0.25,
                  zIndex: -1,
                }}
              />
            )}
            <Pressable
              onPress={handleStartSession}
              disabled={!selectedMood}
              style={({ pressed }) => ({
                opacity: !selectedMood ? 0.45 : pressed ? 0.88 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
                backgroundColor: colors.primary,
                borderRadius: 28,
                paddingVertical: 13,
                alignItems: "center",
                ...(selectedMood && {
                  shadowColor: colors.primary,
                  shadowOpacity: 0.4,
                  shadowRadius: 12,
                  shadowOffset: { width: 0, height: 6 },
                  elevation: 8,
                }),
              })}
            >
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
                {t("home.startSession")}
              </Text>
            </Pressable>
          </View>

          {/* Relaxation Tools Button — same glass style as mood cards */}
          <Pressable
            onPress={handleRelaxationTools}
            style={({ pressed }) => ({
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: pressed ? 0.96 : 1 }],
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(255, 255, 255, 0.60)",
              borderRadius: 18,
              borderWidth: 1.5,
              borderColor: isDark
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(255, 255, 255, 0.50)",
              paddingVertical: 12,
              alignItems: "center",
              shadowColor: "#000000",
              shadowOpacity: isDark ? 0.15 : 0.08,
              shadowRadius: isDark ? 6 : 4,
              shadowOffset: { width: 0, height: 2 },
              elevation: isDark ? 2 : 1,
            })}
          >
            {/* Glass highlight */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "40%",
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.04)"
                  : "rgba(255, 255, 255, 0.25)",
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                opacity: 0.6,
                pointerEvents: "none",
              }}
            />
            <Text style={{ fontSize: 15, fontWeight: "600", color: colors.foreground, zIndex: 10 }}>
              🧘 {t("tools.title")}
            </Text>
          </Pressable>

          <Text style={{ fontSize: 10, color: colors.muted, textAlign: "center", lineHeight: 14 }}>
            {t("settings.disclaimer")}
          </Text>
        </View>

      </View>
      </ScreenContainer>
    </AnimatedGradientBg>
  );
}
