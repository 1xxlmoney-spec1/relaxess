import { ScrollView, Text, View, Pressable, Platform, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAppContext } from "@/lib/app-context";
import { useTranslation, SUPPORTED_LANGUAGES, type Language } from "@/lib/i18n";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";
import { useState, useRef } from "react";
// DevTestingPanel is for UI testing only — it does NOT simulate real Apple purchases.
// It allows the developer to toggle between Free and Premium states during development.
// __DEV__ is true in Expo Go, Metro dev server, and development builds.
// __DEV__ is false in production builds (EAS production, TestFlight production, App Store),
// so the panel and the six-tap gesture are completely unavailable to end users.
import { DevTestingPanel } from "@/lib/dev-testing-panel";
import { usePremium } from "@/hooks/use-premium";

export default function SettingsTabScreen() {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    session,
  } = useAppContext();
  const { t } = useTranslation(language);
  const colors = useColors();
  const router = useRouter();
  const [showDevPanel, setShowDevPanel] = useState(false);
  const versionTapCountRef = useRef(0);
  const versionTapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Real IAP hook — replaces the placeholder setPremium(true)
  const {
    products,
    isLoading: iapLoading,
    isPurchasing,
    purchaseMonthly,
    purchaseAnnual,
    restore,
  } = usePremium();

  const handleVersionTap = () => {
    // Six-tap gesture is a no-op in production builds (__DEV__ === false).
    // Panel is only accessible in development and Expo Go.
    if (!__DEV__) return;
    versionTapCountRef.current += 1;

    if (versionTapCountRef.current === 1) {
      versionTapTimeoutRef.current = setTimeout(() => {
        versionTapCountRef.current = 0;
      }, 3000);
    }

    if (versionTapCountRef.current >= 6) {
      setShowDevPanel(true);

      versionTapCountRef.current = 0;

      if (versionTapTimeoutRef.current) {
        clearTimeout(versionTapTimeoutRef.current);
        versionTapTimeoutRef.current = null;
      }

      if (Platform.OS !== "web") {
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );
      }
    }
  };

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleUpgradeMonthly = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    purchaseMonthly();
  };

  const handleUpgradeAnnual = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    purchaseAnnual();
  };

  const handleRestore = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    restore();
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View className="flex-1 px-6 py-8">
          {/* Header */}
          <Text className="text-3xl font-bold text-foreground mb-8 pt-4">
            {t("settings.title")}
          </Text>

          {/* Theme Section */}
          <View className="gap-4 mb-8">
            <Text className="text-sm font-semibold text-muted uppercase">
              {t("settings.theme")}
            </Text>
            <View className="flex-row gap-3">
              <Pressable
                onPress={handleThemeChange}
                style={({ pressed }) => [
                  { flex: 1 },
                  {
                    opacity: pressed ? 0.7 : 1,
                    transform: [{ scale: pressed ? 0.94 : 1 }],
                  },
                ]}
              >
                <View
                  style={{
                    backgroundColor: theme === "dark" ? "rgba(0, 200, 255, 0.15)" : "rgba(10, 126, 164, 0.15)",
                    borderColor: theme === "dark" ? "rgba(0, 200, 255, 0.3)" : "rgba(10, 126, 164, 0.3)",
                    shadowColor: theme === "dark" ? "#00C8FF" : "#0a7ea4",
                  }}
                  className="py-3 px-4 rounded-xl border items-center shadow-md"
                >
                  <Text className="font-semibold text-foreground">
                    🌙 {t("settings.darkMode")}
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={handleThemeChange}
                style={({ pressed }) => [
                  { flex: 1 },
                  {
                    opacity: pressed ? 0.7 : 1,
                    transform: [{ scale: pressed ? 0.94 : 1 }],
                  },
                ]}
              >
                <View
                  style={{
                    backgroundColor: theme === "light" ? "rgba(0, 200, 255, 0.15)" : "rgba(10, 126, 164, 0.15)",
                    borderColor: theme === "light" ? "rgba(0, 200, 255, 0.3)" : "rgba(10, 126, 164, 0.3)",
                    shadowColor: theme === "light" ? "#00C8FF" : "#0a7ea4",
                  }}
                  className="py-3 px-4 rounded-xl border items-center shadow-md"
                >
                  <Text className="font-semibold text-foreground">
                    ☀️ {t("settings.lightMode")}
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Language Section */}
          <View className="gap-4 mb-8">
            <Text className="text-sm font-semibold text-muted uppercase">
              {t("settings.language")}
            </Text>
            <View className="gap-2">
              {(Object.entries(SUPPORTED_LANGUAGES) as [Language, string][]).map(
                ([lang, name]) => (
                  <Pressable
                    key={lang}
                    onPress={() => handleLanguageChange(lang)}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.7 : 1,
                        transform: [{ scale: pressed ? 0.94 : 1 }],
                      },
                    ]}
                  >
                    <View
                      style={{
                        backgroundColor: language === lang ? "rgba(0, 200, 255, 0.15)" : "rgba(10, 126, 164, 0.15)",
                        borderColor: language === lang ? "rgba(0, 200, 255, 0.3)" : "rgba(10, 126, 164, 0.3)",
                        shadowColor: language === lang ? "#00C8FF" : "#0a7ea4",
                      }}
                      className="py-3 px-4 rounded-xl border flex-row justify-between items-center shadow-md"
                    >
                      <Text className="font-semibold text-foreground">
                        {name}
                      </Text>
                      {language === lang && (
                        <Text className="text-foreground">✓</Text>
                      )}
                    </View>
                  </Pressable>
                )
              )}
            </View>
          </View>

          {/* Subscription Section */}
          <View className="gap-4 mb-8">
            <Text className="text-sm font-semibold text-muted uppercase">
              {t("settings.subscription")}
            </Text>
            <View
              style={{
                backgroundColor: theme === "dark" ? "rgba(0, 200, 255, 0.15)" : "rgba(10, 126, 164, 0.15)",
                borderColor: theme === "dark" ? "rgba(0, 200, 255, 0.3)" : "rgba(10, 126, 164, 0.3)",
                shadowColor: theme === "dark" ? "#00C8FF" : "#0a7ea4",
              }}
              className="p-5 rounded-2xl border shadow-lg gap-4"
            >
              {/* Current Status */}
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-base font-semibold text-foreground">
                    {session.isPremium ? t("settings.premium") : t("settings.free")}
                  </Text>
                  {session.isPremium && session.premiumExpiresAt && (
                    <Text className={theme === "dark" ? "text-xs text-white text-opacity-75 mt-1" : "text-xs text-muted mt-1"}>
                      Expires: {new Date(session.premiumExpiresAt).toLocaleDateString()}
                    </Text>
                  )}
                </View>
                <Text className="text-2xl">
                  {session.isPremium ? "👑" : "✨"}
                </Text>
              </View>

              {/* Purchase Options — shown only when not premium */}
              {!session.isPremium && (
                <>
                  {/* Loading state while IAP initializes */}
                  {iapLoading ? (
                    <View className="items-center py-2">
                      <ActivityIndicator size="small" color={colors.primary} />
                      <Text className="text-xs text-muted mt-2">Loading subscription options…</Text>
                    </View>
                  ) : (
                    <View className="gap-3">
                      {/* Monthly Plan */}
                      <Pressable
                        onPress={handleUpgradeMonthly}
                        disabled={isPurchasing}
                        style={({ pressed }) => [
                          {
                            opacity: isPurchasing ? 0.5 : pressed ? 0.7 : 1,
                            transform: [{ scale: pressed ? 0.94 : 1 }],
                          },
                        ]}
                      >
                        <View
                          style={{
                            backgroundColor: theme === "dark" ? "rgba(0, 200, 255, 0.2)" : "rgba(10, 126, 164, 0.2)",
                            borderColor: theme === "dark" ? "rgba(0, 200, 255, 0.4)" : "rgba(10, 126, 164, 0.4)",
                          }}
                          className="py-3 px-4 rounded-lg border flex-row justify-between items-center"
                        >
                          <View>
                            <Text className="text-foreground font-bold">
                              {t("settings.upgrade")}
                            </Text>
                            <Text className="text-xs text-muted mt-0.5">Monthly plan</Text>
                          </View>
                          <Text className="text-foreground font-semibold">
                            {products?.monthlyLocalizedPrice ?? "$2.99/mo"}
                          </Text>
                        </View>
                      </Pressable>

                      {/* Annual Plan */}
                      <Pressable
                        onPress={handleUpgradeAnnual}
                        disabled={isPurchasing}
                        style={({ pressed }) => [
                          {
                            opacity: isPurchasing ? 0.5 : pressed ? 0.7 : 1,
                            transform: [{ scale: pressed ? 0.94 : 1 }],
                          },
                        ]}
                      >
                        <View
                          style={{
                            backgroundColor: theme === "dark" ? "rgba(0, 200, 255, 0.25)" : "rgba(10, 126, 164, 0.25)",
                            borderColor: theme === "dark" ? "rgba(0, 200, 255, 0.5)" : "rgba(10, 126, 164, 0.5)",
                          }}
                          className="py-3 px-4 rounded-lg border flex-row justify-between items-center"
                        >
                          <View>
                            <View className="flex-row items-center gap-2">
                              <Text className="text-foreground font-bold">
                                Annual Plan
                              </Text>
                              <View
                                style={{ backgroundColor: theme === "dark" ? "rgba(0, 200, 255, 0.3)" : "rgba(10, 126, 164, 0.3)" }}
                                className="px-2 py-0.5 rounded-full"
                              >
                                <Text className="text-xs text-foreground font-semibold">Save 30%</Text>
                              </View>
                            </View>
                            <Text className="text-xs text-muted mt-0.5">Best value</Text>
                          </View>
                          <Text className="text-foreground font-semibold">
                            {products?.annualLocalizedPrice ?? "$24.99/yr"}
                          </Text>
                        </View>
                      </Pressable>

                      {/* Restore Purchases — required by Apple App Store guidelines */}
                      <Pressable
                        onPress={handleRestore}
                        disabled={isPurchasing}
                        style={({ pressed }) => [
                          {
                            opacity: isPurchasing ? 0.4 : pressed ? 0.6 : 1,
                          },
                        ]}
                      >
                        <Text className="text-center text-xs text-muted mt-1">
                          Restore Purchases
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </>
              )}

              {/* Purchasing indicator */}
              {isPurchasing && (
                <View className="items-center py-1">
                  <ActivityIndicator size="small" color={colors.primary} />
                  <Text className="text-xs text-muted mt-1">Processing…</Text>
                </View>
              )}
            </View>

            {/* Subscription disclosure — required by Apple App Store guidelines */}
            {!session.isPremium && (
              <View className="gap-2 px-1">
                <Text className="text-xs text-muted leading-relaxed">
                  Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period. Manage or cancel subscriptions in your Apple ID account settings.
                </Text>
                {/* Legal links — must be visible and tappable before user confirms a purchase */}
                <View className="flex-row gap-4">
                  <Pressable
                    onPress={() => {
                      if (Platform.OS !== "web") {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }
                      router.push("/privacy-policy");
                    }}
                    style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.primary,
                        textDecorationLine: "underline",
                      }}
                    >
                      Privacy Policy
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      if (Platform.OS !== "web") {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }
                      router.push("/terms-of-use");
                    }}
                    style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.primary,
                        textDecorationLine: "underline",
                      }}
                    >
                      Terms of Use
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>

          {/* Legal Section */}
          <View className="gap-4 mb-8">
            <Text className="text-sm font-semibold text-muted uppercase">
              Legal
            </Text>
            <View className="gap-2">
              {/* Privacy Policy row */}
              <Pressable
                onPress={() => {
                  if (Platform.OS !== "web") {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                  router.push("/privacy-policy");
                }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >
                <View
                  style={{
                    backgroundColor: theme === "dark" ? "rgba(10, 126, 164, 0.1)" : "rgba(10, 126, 164, 0.07)",
                    borderColor: theme === "dark" ? "rgba(10, 126, 164, 0.3)" : "rgba(10, 126, 164, 0.2)",
                  }}
                  className="py-3 px-4 rounded-xl border flex-row justify-between items-center"
                >
                  <Text className="text-foreground font-medium">Privacy Policy</Text>
                  <Text className="text-muted text-base">›</Text>
                </View>
              </Pressable>

              {/* Terms of Use row */}
              <Pressable
                onPress={() => {
                  if (Platform.OS !== "web") {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                  router.push("/terms-of-use");
                }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >
                <View
                  style={{
                    backgroundColor: theme === "dark" ? "rgba(10, 126, 164, 0.1)" : "rgba(10, 126, 164, 0.07)",
                    borderColor: theme === "dark" ? "rgba(10, 126, 164, 0.3)" : "rgba(10, 126, 164, 0.2)",
                  }}
                  className="py-3 px-4 rounded-xl border flex-row justify-between items-center"
                >
                  <Text className="text-foreground font-medium">Terms of Use</Text>
                  <Text className="text-muted text-base">›</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Disclaimer */}
          <View
            style={{
              backgroundColor: theme === "dark" ? "rgba(255, 152, 0, 0.1)" : "rgba(245, 158, 11, 0.1)",
              borderColor: theme === "dark" ? "rgba(255, 152, 0, 0.3)" : "rgba(245, 158, 11, 0.3)",
            }}
            className="p-4 rounded-xl border gap-2"
          >
            <Text className="text-xs font-semibold text-warning uppercase">
              Disclaimer
            </Text>
            <Text className={theme === "dark" ? "text-xs text-white text-opacity-75 leading-relaxed" : "text-xs text-foreground leading-relaxed"}>
              {t("settings.disclaimer")}
            </Text>
          </View>

          {/* Developer Trigger - Hidden Version Text */}
          <Pressable
            onPress={handleVersionTap}
            style={{
              marginTop: 40,
              marginBottom: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              selectable={false}
              style={{
                fontSize: 12,
                color: colors.muted,
                opacity: 0.5,
                userSelect: "none",
              }}
            >
              Relaxess v1.0.0
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* DevTestingPanel is only rendered in development builds (__DEV__ === true).
          In production builds (EAS production, TestFlight production, App Store),
          __DEV__ is false and this component is never mounted or accessible. */}
      {__DEV__ && <DevTestingPanel visible={showDevPanel} onClose={() => setShowDevPanel(false)} />}
    </ScreenContainer>
  );
}
