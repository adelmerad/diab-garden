export type TrackedMetrics =
  | "Glucose"
  | "Activity"
  | "Water"
  | "Sleep"
  | "Diet";

export type BaseRecording = {
  id: string;
  date: string; // ISO
  type: TrackedMetrics;
};

export type GlucoseRecording = BaseRecording & {
  type: "Glucose";
  when: "After Meal" | "Fasting";
  value: number;
};

export type ActivityRecording = BaseRecording & {
  type: "Activity";
  minutes: number;
};

export type WaterRecording = BaseRecording & {
  type: "Water";
  ml: number;
};

export type SleepRecording = BaseRecording & {
  type: "Sleep";
  start: string;
  end: string;
};

export type DietRecording = BaseRecording & {
  type: "Diet";
  calories: number;
  carbs: number;
};

export type Recording =
  | GlucoseRecording
  | ActivityRecording
  | WaterRecording
  | SleepRecording
  | DietRecording;

interface UserAPI {
  // returns array of that recording type, with a history that lasts that many days
  getRecordings(type: TrackedMetrics, days): Recording[];
  getPersonalGoals(): PersonalGoal;
  getMetricStreak(type: TrackedMetrics | "Daily"): number;
}

export type GoalType =
  | "STREAK_WATER"
  | "STREAK_DAILY"
  | "HEALTHY_GLUCOSE_STREAK";

export type AchievementType = "GLUCOSE_REBALANCE" | "PERFECT_DAY";

// TODO: Make bento Use personal goals
export interface PersonalGoal {
  waterIntake: number;
  activity: number;
  calories: number;
  carbs: number;
  sleepHours: number;
}

// Goal definition
interface GoalRecord {
  id: number;
  name: string;
  description: string;
  value: number;
  rewardId: number;
  completed?: boolean;
  completedAt?: string;
}

export interface Goal extends GoalRecord {
  type: GoalType;
}

export interface Achievement extends GoalRecord {
  type: AchievementType;
}
