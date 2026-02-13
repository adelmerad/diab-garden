import colors from "@/config/ui-colors";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";

const AchievementsButton = ({
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 24,
        paddingVertical: 18,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: colors["secondary-foreground"],
        marginBottom: 24,
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600" }}>Achievements</Text>
    </TouchableOpacity>
  );
};

export default AchievementsButton;
