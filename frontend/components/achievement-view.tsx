import { View, Text, FlatList, Pressable } from "react-native";
import { ProgressBar } from "./progress";
import { GoalRecord } from "@/config/types";
import { useAchievements } from "@/lib/use-achievements";
import { useGarden } from "@/lib/garden/use-garden";
import colors from "@/config/ui-colors";

const AchievementItem = ({ achievement }: { achievement: GoalRecord }) => {
  const getProgress = useAchievements((s) => s.getAchievementInfo);
  const redeemPlant = useGarden((s) => s.redeemPlant);
  const markCompleted = useAchievements((s) => s.markCompleted);

  const progress = getProgress(achievement.id.toString());

  return (
    <Pressable
      onPress={() => {
        if (!progress.completion) return;

        redeemPlant(achievement.rewardId);
        markCompleted(achievement.id);
      }}
    >
      <View
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#f4f4f4",
          borderWidth: progress.completion ? 1 : 0,
          borderColor: progress.completion ? colors.primary : colors.muted,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          {achievement.name}
        </Text>

        <Text style={{ marginTop: 4, color: "#666" }}>
          {achievement.description}
        </Text>

        <View style={{ marginTop: 12 }}>
          <ProgressBar progress={progress.progress * 100} height={8} />
        </View>

        <Text style={{ marginTop: 6, fontSize: 12 }}>
          {(progress.progress * 100).toFixed(2)}% complete
        </Text>
      </View>
    </Pressable>
  );
};

const AchievementsScreen = () => {
  const achievements = useAchievements((s) => s.achievements);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AchievementItem achievement={item} />}
        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  );
};

export default AchievementsScreen;
