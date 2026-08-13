import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, Text, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { useColors } from "@/hooks/use-colors";
import { useAppContext } from "@/lib/app-context";

// Custom emoji tab icon component - simple and fast
function EmojiTabIcon({ emoji, isActive }: { emoji: string; isActive: boolean }) {
  const colors = useColors();
  const isDark = colors.background === "#0A1F2E" || colors.background === "#151718";

  return (
    <View
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isActive
          ? isDark
            ? "rgba(0, 217, 255, 0.12)"
            : "rgba(10, 126, 164, 0.10)"
          : isDark
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(255, 255, 255, 0.60)",
        borderWidth: 1.5,
        borderColor: isActive
          ? isDark
            ? "rgba(0, 217, 255, 0.40)"
            : "rgba(10, 126, 164, 0.35)"
          : isDark
          ? "rgba(255, 255, 255, 0.15)"
          : "rgba(255, 255, 255, 0.50)",
        shadowColor: isActive
          ? isDark
            ? "#00D9FF"
            : "#0a7ea4"
          : "#000000",
        shadowOpacity: isActive
          ? isDark
            ? 0.25
            : 0.15
          : isDark
          ? 0.15
          : 0.08,
        shadowRadius: isActive ? 8 : 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: isActive ? 4 : 1,
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
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.04)"
            : "rgba(255, 255, 255, 0.25)",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
      <Text style={{ fontSize: 26, lineHeight: 30, zIndex: 10 }}>{emoji}</Text>
    </View>
  );
}

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : 8;
  const tabBarHeight = 56;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
          overflow: "visible",
        },
        tabBarLabelStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <EmojiTabIcon emoji="🏠" isActive={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => <EmojiTabIcon emoji="⚙️" isActive={focused} />,
        }}
      />
      <Tabs.Screen
        name="music"
        options={{
          title: "Music",
          tabBarIcon: ({ focused }) => <EmojiTabIcon emoji="🎵" isActive={focused} />,
        }}
      />
    </Tabs>
  );
}
