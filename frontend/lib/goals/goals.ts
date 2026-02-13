import { Goal, GoalRecord, GoalType, UserAPI } from "@/config/types";

export interface GoalContext {
  api: UserAPI;
}

export type GoalEvaluator = (
  goal: GoalRecord,
  context: GoalContext,
) => {
  completion: boolean;
  progress: number;
};

const goalEvaluators: Record<GoalType, GoalEvaluator> = {
  STREAK_DAILY: (goal, { api }) => {
    const streak = api.getMetricStreak("Daily");
    return {
      completion: streak >= goal.value,
      progress: streak / goal.value,
    };
  },

  HEALTHY_GLUCOSE_STREAK: (goal, { api }) => {
    const streak = api.getMetricStreak("Glucose");

    return {
      completion: streak >= goal.value,
      progress: streak / goal.value,
    };
  },

  STREAK_WATER: (goal, { api }) => {
    const streak = api.getMetricStreak("Water");

    return {
      completion: streak >= goal.value,
      progress: streak / goal.value,
    };
  },
};

export const evaluateGoal = (goal: Goal, api: UserAPI) => {
  const evaluator = goalEvaluators[goal.type];

  if (!evaluator) return { completion: false, progress: 0 };

  return evaluator(goal, { api });
};
