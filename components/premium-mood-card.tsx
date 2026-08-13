import { View, Text, Pressable } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface PremiumMoodCardProps {
  isSelected: boolean;
  onPress: () => void;
  label: string;
  emoji?: string;
}

export function PremiumMoodCard({ isSelected, onPress, label, emoji }: PremiumMoodCardProps) {
  const colors = useColors();
  const isDark = colors.background === "#0A1F2E" || colors.background === "#151718";

  return (
    <Pressable
      onPress={onPress}
      onLayout={({ nativeEvent }) => console.log("LAYOUT PremiumMoodCard Pressable", nativeEvent.layout)}
      style={{
  flex: 1,
  alignSelf: "stretch",
  width: "100%",
}}
    >
      <View
        onLayout={({ nativeEvent }) => console.log("LAYOUT PremiumMoodCard InnerView", nativeEvent.layout)}
        style={{
          flex: 1,
          borderRadius: 18,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isSelected
            ? isDark
              ? "rgba(0, 217, 255, 0.12)"
              : "rgba(10, 126, 164, 0.10)"
            : isDark
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(255, 255, 255, 0.60)",
          borderWidth: 1.5,
          borderColor: isSelected
            ? isDark
              ? "rgba(0, 217, 255, 0.40)"
              : "rgba(10, 126, 164, 0.35)"
            : isDark
            ? "rgba(255, 255, 255, 0.15)"
            : "rgba(255, 255, 255, 0.50)",
          ...(isSelected && {
            shadowColor: isDark ? "#00D9FF" : "#0a7ea4",
            shadowOpacity: isDark ? 0.25 : 0.15,
            shadowRadius: isDark ? 12 : 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: isDark ? 8 : 6,
          }),
          ...(!isSelected && {
            shadowColor: "#000000",
            shadowOpacity: isDark ? 0.15 : 0.08,
            shadowRadius: isDark ? 6 : 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: isDark ? 2 : 1,
          }),
        }}
      >
        {/* Glass highlight top */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40%",
            backgroundColor: isSelected
              ? isDark
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(255, 255, 255, 0.35)"
              : isDark
              ? "rgba(255, 255, 255, 0.04)"
              : "rgba(255, 255, 255, 0.25)",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />

        {/* Glass shadow bottom */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "30%",
            backgroundColor: isSelected
              ? isDark
                ? "rgba(0, 217, 255, 0.04)"
                : "rgba(10, 126, 164, 0.03)"
              : isDark
              ? "rgba(0, 0, 0, 0.08)"
              : "rgba(0, 0, 0, 0.04)",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        {/* Emoji + Label */}
        <View style={{ justifyContent: "center", alignItems: "center", gap: 4, zIndex: 10 }}>
          {emoji && (
            <Text style={{ fontSize: 28, lineHeight: 32 }}>{emoji}</Text>
          )}
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              textAlign: "center",
              color: isSelected
                ? isDark
                  ? "#00D9FF"
                  : "#0a7ea4"
                : isDark
                ? "rgba(255, 255, 255, 0.85)"
                : "#11181C",
              letterSpacing: 0.3,
              paddingHorizontal: 6,
            }}
            numberOfLines={2}
          >
            {label}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
