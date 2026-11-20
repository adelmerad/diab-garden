import { Achievement, AchievementType, Goal, UserAPI } from "@/config/types";
import { GoalEvaluator, GoalContext } from "./goals";
import { dayKey, dayKeyOf, daysBefore } from "../dates";

const achievementEvaluators: Record<AchievementType, GoalEvaluator> = {
  GLUCOSE_REBALANCE: (achievement, { api }) => {
    // 2 days back so the whole of yesterday is included
    const fastingGlucose = api
      .getRecordings("Glucose", 2)
      .filter((r) => r.type === "Glucose" && r.when === "Fasting");

    // Compare calendar days as strings: two Date objects are never === to each other
    const yesterday = daysBefore(1);
    const today = dayKey();
    const inRange = (value: number) => value >= 80 && value <= 130;

    const unbalancedYesterday = fastingGlucose.some(
      (r) => r.type === "Glucose" && dayKeyOf(r.date) === yesterday && !inRange(r.value),
    );
    const balancedToday = fastingGlucose.some(
      (r) => r.type === "Glucose" && dayKeyOf(r.date) === today && inRange(r.value),
    );

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
