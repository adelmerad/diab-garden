import colors from "@/config/ui-colors";
import { View, StyleSheet } from "react-native";

type ProgressBarProps = {
  progress: number; // 0–100
  height?: number;
  marginLeft?: number;
};

export function ProgressBar({
  progress,
  height = 12,
  marginLeft = 16,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(progress, 100));

  return (
    <View style={[styles.container, { height, marginLeft }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clamped}%`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors["secondary"],

    borderRadius: 999,
    overflow: "hidden",
    position: "relative",
  },
  fill: {
    backgroundColor: colors["primary"],
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
});
