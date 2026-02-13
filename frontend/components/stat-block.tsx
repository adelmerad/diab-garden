import colors from "@/config/ui-colors";
import { View, Text } from "react-native";

function StatBlock({ title, value }: { title: string; value: string }) {
  return (
    <View
      style={{
        gap: 4,
        padding: 8,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: colors["primary"],
          fontSize: 14,
          fontWeight: 800,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          color: colors["secondary-foreground"],
          fontSize: 12,
          fontWeight: 300,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export default StatBlock;
