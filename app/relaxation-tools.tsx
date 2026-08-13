import { ScrollView, View, Text, Pressable, Platform, Modal, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAppContext } from "@/lib/app-context";
import { useTranslation } from "@/lib/i18n";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";
import { usePremium } from "@/hooks/use-premium";
import { useState } from "react";

interface RelaxationTool {
  id: string;
  titleKey: string;
  descriptionKey: string;
  isPremium: boolean;
  href: '/' | '/breathing' | '/sleep' | '/grounding' | '/quiet' | '/body-scan' | '/safe-place-visualization';
  icon: string;
}

const RELAXATION_TOOLS: RelaxationTool[] = [
  {
    id: "breathing",
    titleKey: "tools.breathing",
    descriptionKey: "breathing.title",
    isPremium: false,
    href: "/breathing",
    icon: "🫁",
  },
  {
    id: "sleep",
    titleKey: "tools.sleep",
    descriptionKey: "sleep.title",
    isPremium: true,
    href: "/sleep",
    icon: "😴",
  },
  {
    id: "grounding",
    titleKey: "tools.grounding",
    descriptionKey: "grounding.title",
    isPremium: true,
    href: "/grounding",
    icon: "🌍",
  },
  {
    id: "quiet",
    titleKey: "tools.quiet",
    descriptionKey: "quiet.title",
    isPremium: true,
    href: "/quiet",
    icon: "🤫",
  },
  {
    id: "body-scan",
    titleKey: "tools.bodyScan",
    descriptionKey: "tools.bodyScanDescription",
    isPremium: true,
    href: "/body-scan",
    icon: "🧘",
  },
  {
    id: "safe-place",
    titleKey: "tools.safePlace",
    descriptionKey: "tools.safePlaceDescription",
    isPremium: true,
    href: "/safe-place-visualization",
    icon: "🌄",
  },
];

export default function RelaxationToolsScreen() {
  const { language, session, theme } = useAppContext();
  const { t } = useTranslation(language);
  const router = useRouter();
  const colors = useColors();

  // Real IAP hook — purchase is only initiated after explicit user selection in the modal
  const {
    products,
    isLoading: iapLoading,
    isPurchasing,
    purchaseMonthly,
    purchaseAnnual,
    restore,
  } = usePremium();

  // Premium subscription modal state
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Open the premium selection modal — called when a locked tool is tapped
  // No purchase is initiated here; the user must explicitly press Monthly or Annual
  const handleOpenPremiumModal = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowPremiumModal(true);
  };

  const handleClosePremiumModal = () => {
    if (!isPurchasing) {
      setShowPremiumModal(false);
    }
  };

  const handlePurchaseMonthly = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    purchaseMonthly().then(() => setShowPremiumModal(false));
  };

  const handlePurchaseAnnual = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    purchaseAnnual().then(() => setShowPremiumModal(false));
  };

  const handleRestore = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    restore().then(() => setShowPremiumModal(false));
  };

  const handleToolPress = (tool: RelaxationTool) => {
    if (tool.isPremium && !session.isPremium) {
      // Locked tool: open the premium selection modal first.
      // No purchase is initiated automatically — the user must explicitly
      // select Monthly or Annual inside the modal.
      handleOpenPremiumModal();
      return;
    }

    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push(tool.href);
  };

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  return (
    <ScreenContainer
  edges={["left", "right"]}
  className="pt-0"
>
      {/* Fixed Header */}
<View
  style={{
    paddingTop: 52,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: "transparent",
    zIndex: 10,
  }}
>
  <View className="flex-row justify-between items-center">
    <Pressable
      onPress={handleBack}
      style={({ pressed }) => ({
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Text className="text-primary font-semibold">
        {t("common.back")}
      </Text>
    </Pressable>

    <Text className="text-2xl font-bold text-foreground">
      {t("tools.title")}
    </Text>

    <View style={{ width: 40 }} />
  </View>
</View>

{/* Scrollable Content */}
<ScrollView
  style={{ flex: 1 }}
  contentContainerStyle={{
    paddingHorizontal: 24,
    paddingBottom: 80,
  }}
  contentInsetAdjustmentBehavior="never"
  automaticallyAdjustContentInsets={false}
  showsVerticalScrollIndicator={false}
>
  <View style={{ paddingTop: 16 }}>
    {/* Tools Grid */}
    <View className="gap-4">
            {RELAXATION_TOOLS.map((tool) => {
              const isLocked = tool.isPremium && !session.isPremium;

              return (
                <Pressable
  key={tool.id}
  onPress={() => handleToolPress(tool)}
  style={({ pressed }) => ({
    opacity: pressed ? 0.92 : 1,
    transform: [{ scale: pressed ? 0.97 : 1 }],
  })}
>
  {({ pressed }) => (
    <View
      style={{
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
        overflow: "hidden",

        backgroundColor: pressed
          ? theme === "dark"
            ? "rgba(0, 217, 255, 0.12)"
            : "rgba(10, 126, 164, 0.10)"
          : theme === "dark"
            ? "rgba(255, 255, 255, 0.10)"
            : "rgba(235, 247, 247, 0.96)",

        borderColor: pressed
  ? theme === "dark"
    ? "#00D9FF"
    : "#0A7EA4"
  : theme === "dark"
    ? "rgba(255, 255, 255, 0.18)"
    : "rgba(255, 255, 255, 0.45)",

        shadowColor: pressed
          ? theme === "dark"
            ? "#00D9FF"
            : "#0A7EA4"
          : "#000000",

        shadowOpacity: pressed
          ? theme === "dark"
            ? 0.25
            : 0.15
          : theme === "dark"
            ? 0.15
            : 0.08,

        shadowRadius: pressed
          ? theme === "dark"
            ? 12
            : 10
          : theme === "dark"
            ? 6
            : 4,

        shadowOffset: {
          width: 0,
          height: pressed ? 4 : 2,
        },

        elevation: pressed
          ? theme === "dark"
            ? 8
            : 6
          : theme === "dark"
            ? 2
            : 1,
      }}
    >
      {/* Glass highlight */}
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

      <View style={{ zIndex: 10, gap: 8 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ flex: 1, gap: 8 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: theme === "dark"
                  ? "#FFFFFF"
                  : colors.foreground,
              }}
            >
              {t(tool.titleKey)}
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: theme === "dark"
                  ? "rgba(255, 255, 255, 0.75)"
                  : colors.muted,
              }}
            >
              {t(tool.descriptionKey)}
            </Text>
          </View>

          <Text style={{ fontSize: 28, marginLeft: 12 }}>
            {tool.icon}
          </Text>
        </View>

        {isLocked && (
          <View
            style={{
              marginTop: 8,
              paddingTop: 8,
              borderTopWidth: 1,
              borderTopColor: colors.border,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: theme === "dark"
                  ? "#FFB347"
                  : colors.warning,
              }}
            >
              {t("tools.premiumOnly")}
            </Text>
          </View>
        )}
      </View>
    </View>
  )}
</Pressable>
              );
            })}
          </View>

          {/* Premium Upgrade CTA — tapping opens the modal, not a direct purchase */}
          {!session.isPremium && (
            <View className="mt-4 p-4 rounded-2xl bg-primary bg-opacity-10 border border-primary gap-2">
              <Text className="text-lg font-bold text-primary">
                {t("premium.unlockAllTools")}
              </Text>
              <Text className="text-sm text-foreground">
                {t("premium.unlockDescription")}
              </Text>
              <Pressable
                onPress={handleOpenPremiumModal}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.8 : 1,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                  },
                ]}
              >
                <View className="py-3 px-4 rounded-xl bg-primary items-center">
                  <Text className="text-background font-bold">
                    {t("settings.upgrade")}
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Premium Subscription Modal
          Shown when a locked tool is tapped or the CTA button is pressed.
          The user must explicitly select Monthly or Annual before any Apple
          purchase transaction is initiated. No purchase starts automatically. */}
      <Modal
        visible={showPremiumModal}
        transparent
        animationType="slide"
        onRequestClose={handleClosePremiumModal}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}
          onPress={handleClosePremiumModal}
        >
          {/* Inner container — stop press propagation to backdrop */}
          <Pressable
            onPress={() => {}}
            style={{
              backgroundColor: theme === "dark" ? "#1a1f2e" : "#ffffff",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
              paddingBottom: 40,
              gap: 16,
            }}
          >
            {/* Modal Header */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "700", color: theme === "dark" ? "#FFFFFF" : colors.foreground }}>
                {t("premium.unlockAllTools")}
              </Text>
              <Pressable
                onPress={handleClosePremiumModal}
                disabled={isPurchasing}
                style={({ pressed }) => ({ opacity: isPurchasing ? 0.3 : pressed ? 0.6 : 1, padding: 4 })}
              >
                <Text style={{ fontSize: 18, color: colors.muted }}>✕</Text>
              </Pressable>
            </View>

            <Text style={{ fontSize: 14, color: theme === "dark" ? "rgba(255,255,255,0.7)" : colors.muted, lineHeight: 20 }}>
              {t("premium.unlockDescription")}
            </Text>

            {/* Loading state while IAP initializes */}
            {iapLoading ? (
              <View style={{ alignItems: "center", paddingVertical: 12 }}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={{ fontSize: 12, color: colors.muted, marginTop: 8 }}>Loading subscription options…</Text>
              </View>
            ) : (
              <View style={{ gap: 10 }}>
                {/* Monthly Plan — user must explicitly press this to start purchase */}
                <Pressable
                  onPress={handlePurchaseMonthly}
                  disabled={isPurchasing}
                  style={({ pressed }) => ({
                    opacity: isPurchasing ? 0.5 : pressed ? 0.75 : 1,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                    backgroundColor: theme === "dark" ? "rgba(0, 200, 255, 0.2)" : "rgba(10, 126, 164, 0.15)",
                    borderWidth: 1.5,
                    borderColor: theme === "dark" ? "rgba(0, 200, 255, 0.4)" : "rgba(10, 126, 164, 0.3)",
                    borderRadius: 14,
                    padding: 14,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  })}
                >
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: "700", color: theme === "dark" ? "#FFFFFF" : colors.foreground }}>
                      {t("settings.upgrade")}
                    </Text>
                    <Text style={{ fontSize: 12, color: theme === "dark" ? "rgba(255,255,255,0.6)" : colors.muted, marginTop: 2 }}>
                      Monthly plan
                    </Text>
                  </View>
                  <Text style={{ fontSize: 15, fontWeight: "600", color: theme === "dark" ? "#FFFFFF" : colors.foreground }}>
                    {products?.monthlyLocalizedPrice ?? "$2.99/mo"}
                  </Text>
                </Pressable>

                {/* Annual Plan — user must explicitly press this to start purchase */}
                <Pressable
                  onPress={handlePurchaseAnnual}
                  disabled={isPurchasing}
                  style={({ pressed }) => ({
                    opacity: isPurchasing ? 0.5 : pressed ? 0.75 : 1,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                    backgroundColor: theme === "dark" ? "rgba(0, 200, 255, 0.25)" : "rgba(10, 126, 164, 0.2)",
                    borderWidth: 1.5,
                    borderColor: theme === "dark" ? "rgba(0, 200, 255, 0.5)" : "rgba(10, 126, 164, 0.4)",
                    borderRadius: 14,
                    padding: 14,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  })}
                >
                  <View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <Text style={{ fontSize: 15, fontWeight: "700", color: theme === "dark" ? "#FFFFFF" : colors.foreground }}>
                        Annual Plan
                      </Text>
                      <View style={{
                        backgroundColor: theme === "dark" ? "rgba(0, 200, 255, 0.3)" : "rgba(10, 126, 164, 0.25)",
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 20,
                      }}>
                        <Text style={{ fontSize: 11, fontWeight: "600", color: theme === "dark" ? "#FFFFFF" : colors.foreground }}>
                          Save 30%
                        </Text>
                      </View>
                    </View>
                    <Text style={{ fontSize: 12, color: theme === "dark" ? "rgba(255,255,255,0.6)" : colors.muted, marginTop: 2 }}>
                      Best value
                    </Text>
                  </View>
                  <Text style={{ fontSize: 15, fontWeight: "600", color: theme === "dark" ? "#FFFFFF" : colors.foreground }}>
                    {products?.annualLocalizedPrice ?? "$24.99/yr"}
                  </Text>
                </Pressable>

                {/* Restore Purchases — required by Apple App Store guidelines */}
                <Pressable
                  onPress={handleRestore}
                  disabled={isPurchasing}
                  style={({ pressed }) => ({
                    opacity: isPurchasing ? 0.3 : pressed ? 0.6 : 1,
                    alignItems: "center",
                    paddingVertical: 6,
                  })}
                >
                  <Text style={{ fontSize: 12, color: colors.muted }}>
                    Restore Purchases
                  </Text>
                </Pressable>
              </View>
            )}

            {/* Purchasing indicator */}
            {isPurchasing && (
              <View style={{ alignItems: "center", paddingVertical: 4 }}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={{ fontSize: 12, color: colors.muted, marginTop: 6 }}>Processing…</Text>
              </View>
            )}

            {/* Subscription disclosure — required by Apple App Store guidelines */}
            <Text style={{ fontSize: 11, color: colors.muted, lineHeight: 16, textAlign: "center" }}>
              Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period. Manage or cancel in your Apple ID account settings.
            </Text>

            {/* Legal links — must be visible and tappable before user confirms a purchase */}
            <View style={{ flexDirection: "row", justifyContent: "center", gap: 20, marginTop: 4 }}>
              <Pressable
                onPress={() => {
                  setShowPremiumModal(false);
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
                  setShowPremiumModal(false);
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
          </Pressable>
        </Pressable>
      </Modal>
    </ScreenContainer>
  );
}
