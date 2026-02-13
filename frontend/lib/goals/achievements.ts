import { Achievement, AchievementType, Goal, UserAPI } from "@/config/types";
import { GoalEvaluator, GoalContext } from "./goals";

const achievementEvaluators: Record<AchievementType, GoalEvaluator> = {
  GLUCOSE_REBALANCE: (achievement, { api }) => {
    const glucoseRecordings = api.getRecordings("Glucose", 1);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdaysRecordings = glucoseRecordings.filter(
      (r) =>
        new Date(r.date) === yesterday &&
        r.type === "Glucose" &&
        r.when === "Fasting",
    );

    let unbalancedYesterday = false;
    yesterdaysRecordings.forEach((r) => {
      if (r.type !== "Glucose") return;

      if (r.value < 80 || r.value > 130) unbalancedYesterday = true;
    });

    const today = new Date();
    const todaysRecordings = glucoseRecordings.filter(
      (r) =>
        new Date(r.date) === today &&
        r.type === "Glucose" &&
        r.when === "Fasting",
    );

    let balancedToday = false;
    todaysRecordings.forEach((r) => {
      if (r.type !== "Glucose") return;

      if (r.value >= 80 && r.value <= 130) balancedToday = true;
    });

    const completed = unbalancedYesterday && balancedToday;
    return {
      completion: completed,
      progress: completed ? 1 : 0,
    };
  },

  PERFECT_DAY: (achievement, { api }) => {
    const perfected = {
      activity: api.getMetricStreak("Activity") >= 1,
      daily: api.getMetricStreak("Daily") >= 1,
      water: api.getMetricStreak("Water") >= 1,
      sleep: api.getMetricStreak("Sleep") >= 1,
      glucose: api.getMetricStreak("Glucose") >= 1,
      diet: api.getMetricStreak("Diet") >= 1,
    };

    const streaksTotal = Object.keys(perfected).length;
    const amountCompleted = Object.keys(perfected).reduce((acc, key) => {
      if (perfected[key as keyof typeof perfected]) return acc + 1;
      return acc;
    }, 0);

    return {
      completion: amountCompleted == streaksTotal,
      progress: amountCompleted / streaksTotal,
    };
  },
};

export const evaluateAchievement = (achievement: Achievement, api: UserAPI) => {
  const evaluator = achievementEvaluators[achievement.type];

  if (!evaluator) return { completion: false, progress: 0 };

  return evaluator(achievement, { api });
};
