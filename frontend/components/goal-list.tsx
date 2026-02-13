import { Goal } from "@/config/types";
import colors from "@/config/ui-colors";
import { useGoalsStore } from "@/lib/goals/goal-store";
import { FlatList, View, Text, Pressable } from "react-native";
import { ProgressBar } from "./progress";
import { evaluateGoal } from "@/lib/goals/goals";
import { userAPI } from "@/lib/user-api";
import { useGarden } from "@/lib/garden/use-garden";

const GoalItem = ({ goal }: { goal: Goal }) => {
  const evaluation = evaluateGoal(goal, userAPI);
  const { redeemPlant } = useGarden();
  const { markCompleted } = useGoalsStore();

  return (
    <Pressable
      onPress={() => {
        if (!evaluation.completion) return;

        redeemPlant(goal.rewardId);
        markCompleted(goal.id);
      }}
    >
      <View
        style={{
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.muted,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{goal.name}</Text>

        <Text style={{ marginTop: 4, color: "#666" }}>{goal.description}</Text>

        {goal.completed && (
          <Text style={{ marginTop: 8, color: "green" }}>Completed</Text>
        )}

        <View
          style={{
            marginTop: 16,
          }}
        >
          <ProgressBar
            progress={evaluation.progress * 100}
            height={12}
            marginLeft={0}
          />
        </View>
      </View>
    </Pressable>
  );
};

const GoalList = () => {
  const goals = useGoalsStore((s) => s.goals);

  return (
    <FlatList
      data={goals.filter((g) => !g.completed)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <GoalItem goal={item} />}
      contentContainerStyle={{ gap: 12 }}
    />
  );
};

export default GoalList;
