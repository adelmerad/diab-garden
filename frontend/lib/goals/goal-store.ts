import { Goal, UserAPI } from "@/config/types";
import { create } from "zustand";
import { evaluateGoal } from "./goals";

interface GoalsState {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  checkGoals: (api: UserAPI) => Promise<void>;
  markCompleted: (id: number) => void;
}

// TODO: Make the app choose random goals instead from a big goal
const DEFAULT_GOALS: Goal[] = [
  {
    id: 0,
    type: "STREAK_DAILY",
    value: 8,
    name: "Daily streak",
    description: "Complete your streak for 8 days straight",
    rewardId: 8,
  },
  {
    id: 3,
    type: "STREAK_DAILY",
    value: 1,
    name: "Daily streak",
    description: "Complete your streak for 8 days straight",
    rewardId: 8,
  },
  {
    id: 1,
    type: "HEALTHY_GLUCOSE_STREAK",
    value: 5,
    name: "Healthy Glucose Path",
    description: "Keep your glucose levels healthy for 5 days",
    rewardId: 1,
  },
  {
    id: 2,
    type: "STREAK_WATER",
    value: 1,
    name: "Beginnes Hydration Guide",
    description: "Keep your hydration up for a day",
    rewardId: 2,
  },
];

export const useGoalsStore = create<GoalsState>((set, get) => ({
  goals: DEFAULT_GOALS,

  setGoals: (goals) => set({ goals }),

  addGoal: (goal) =>
    set((state) => ({
      goals: [...state.goals, goal],
    })),

  markCompleted: (id) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === id
          ? { ...g, completed: true, completedAt: new Date().toISOString() }
          : g,
      ),
    })),

  checkGoals: async (api) => {
    const { goals } = get();

    for (const goal of goals) {
      if (goal.completed) continue;

      const completed = await evaluateGoal(goal, api);
      if (completed) {
        get().markCompleted(goal.id);
      }
    }
  },
}));
