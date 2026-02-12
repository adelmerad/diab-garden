import AchievementsButton from "@/components/achievement-button";
import GoalList from "@/components/goal-list";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native";

const progress = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <AchievementsButton onPress={() => router.push("/achievements")} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        Goals
      </Text>
      <GoalList />
    </View>
  );
};

export default progress;
