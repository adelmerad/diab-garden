import { useRecordingStore } from "./records";
import { useTaskStore } from "./daily-tasks";
import {
  PersonalGoal,
  Recording,
  TrackedMetrics,
  UserAPI,
} from "@/config/types";
import { getSleepTime } from "./stats-function";
import { useAchievements } from "./use-achievements";
import { usePersonalGoalStore } from "./use-personal-goals";

const todayString = () => new Date().toISOString().split("T")[0];

const isSameDay = (a: string, b: string) =>
  new Date(a).toISOString().split("T")[0] ===
  new Date(b).toISOString().split("T")[0];

const daysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
};

class LocalUserAPI implements UserAPI {
  private personalGoals: PersonalGoal = usePersonalGoalStore.getState().goals;

  getRecordings(type: TrackedMetrics, days: number): Recording[] {
    const { recordings } = useRecordingStore.getState();

    const cutoff = daysAgo(days);

    return recordings.filter(
      (r) => r.type === type && new Date(r.date) >= cutoff,
    );
  }

  getPersonalGoals(): PersonalGoal {
    return this.personalGoals;
  }

  getMetricStreak(type: TrackedMetrics | "Daily"): number {
    if (type === "Daily") {
      return this.getDailyTaskStreak();
    }

    return this.getMetricRecordingStreak(type);
  }

  private getDailyTaskStreak(): number {
    const { history } = useTaskStore.getState();

    let streak = 0;
    let cursor = new Date();

    while (true) {
      const dateStr = cursor.toISOString().split("T")[0];

      if (history.includes(dateStr)) {
        streak++;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  public getCompeletedAchievements() {
    const { achievements } = useAchievements.getState();

    return achievements;
  }

  private getMetricRecordingStreak(type: TrackedMetrics): number {
    const { recordings } = useRecordingStore.getState();
    const goals = this.personalGoals;

    let streak = 0;
    let cursor = new Date();

    while (true) {
      const dayStr = cursor.toISOString().split("T")[0];

      const dayRecordings = recordings.filter(
        (r) => r.type === type && isSameDay(r.date, dayStr),
      );

      if (!this.meetsGoalForDay(type, dayRecordings, goals)) {
        break;
      }

      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }

    return streak;
  }

  private meetsGoalForDay(
    type: TrackedMetrics,
    recordings: Recording[],
    goals: PersonalGoal,
  ): boolean {
    if (recordings.length === 0) return false;

    switch (type) {
      case "Water":
        const totalWater = recordings.reduce(
          (sum, r) => (r.type === "Water" ? sum + r.ml : sum),
          0,
        );
        return totalWater >= goals.waterIntake;

      case "Activity":
        const totalMinutes = recordings.reduce(
          (sum, r) => (r.type === "Activity" ? sum + r.minutes : sum),
          0,
        );
        return totalMinutes >= goals.activity;

      case "Diet":
        const calories = recordings.reduce(
          (sum, r) => (r.type === "Diet" ? sum + r.calories : sum),
          0,
        );
        const carbs = recordings.reduce(
          (sum, r) => (r.type === "Diet" ? sum + r.carbs : sum),
          0,
        );

        return calories <= goals.calories && carbs <= goals.carbs;

      case "Sleep":
        const totalSleepHours = recordings.reduce((sum, r) => {
          if (r.type !== "Sleep") return sum;
          return sum + getSleepTime(r.start, r.end);
        }, 0);

        return totalSleepHours >= goals.sleepHours;

      case "Glucose":
        return recordings.every((r) => {
          if (r.type !== "Glucose") return true;

          if (r.when === "Fasting") return r.value >= 80 && r.value <= 130;
          else return r.value <= 180;
        });

      default:
        return false;
    }
  }
}

export const userAPI: UserAPI = new LocalUserAPI();
