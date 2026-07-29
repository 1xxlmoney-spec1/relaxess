import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing as ReanimatedEasing,
} from "react-native-reanimated";
import { useAppContext } from "@/lib/app-context";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export function AnimatedGradientBg({ children }: { children: React.ReactNode }) {
  const { theme } = useAppContext();
  const isDark = theme === "dark";

  // Animated opacity for gradient shift
  const opacity1 = useSharedValue(1);
  const opacity2 = useSharedValue(0.3);

  useEffect(() => {
    // Start animation loop for gradient shift
    opacity1.value = withRepeat(
      withTiming(0.3, {
        duration: 6000,
        easing: ReanimatedEasing.inOut(ReanimatedEasing.sin),
      }),
      -1,
      true
    );

    opacity2.value = withRepeat(
      withTiming(1, {
        duration: 6000,
        easing: ReanimatedEasing.inOut(ReanimatedEasing.sin),
      }),
      -1,
      true
    );
  }, [opacity1, opacity2]);

  const animatedStyle1 = useAnimatedStyle(() => ({
    opacity: opacity1.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));

  // Dark theme: deep ocean blues with cyan accents
  const darkColors1: [string, string, string] = ["#0A1F2E", "#0D2A3D", "#051420"];
  const darkColors2: [string, string, string] = ["#0D2A3D", "#0A4A5C", "#051420"];

  // Light theme: soft sky blues and whites
  const lightColors1: [string, string, string] = ["#FFFFFF", "#E8F4F8", "#F0F8FF"];
  const lightColors2: [string, string, string] = ["#F0F8FF", "#E0F2FE", "#FFFFFF"];

  const colors1: [string, string, string] = isDark ? darkColors1 : lightColors1;
  const colors2: [string, string, string] = isDark ? darkColors2 : lightColors2;

  return (
    <View style={{ flex: 1, position: "relative" }}>
      {/* Base gradient layer 1 */}
      <Animated.View
        style={[
          {
            position: "absolute",
            inset: 0,
            zIndex: 0,
          },
          animatedStyle1,
        ]}
      >
        <LinearGradient
          colors={colors1}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </Animated.View>

      {/* Animated gradient layer 2 */}
      <Animated.View
        style={[
          {
            position: "absolute",
            inset: 0,
            zIndex: 0,
          },
          animatedStyle2,
        ]}
      >
        <LinearGradient
          colors={colors2}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>

      {/* Content layer */}
      <View style={{ flex: 1, zIndex: 1, position: "relative" }}>
        {children}
      </View>
    </View>
  );
}
