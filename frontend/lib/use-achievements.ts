import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Achievement } from "@/config/types";
import { evaluateAchievement } from "./goals/achievements";
import { userAPI } from "./user-api";
import Achievements from "@/app/achievements";

interface AchievementStore {
  achievements: Achievement[];
  setAchievements: (achievements: Achievement[]) => void;
  addAchievement: (achievement: Achievement) => void;
  markCompleted: (id: number) => void;
  getAchievementInfo: (id: string) => {
    completion: boolean;
    progress: number;
  };
}

const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    type: "GLUCOSE_REBALANCE",
    value: 1,
    id: 0,
    name: "Recovery",
    description: "Recover the balance of fasting glucose after a bad day",
    rewardId: 1,
  },
  {
    type: "PERFECT_DAY",
    value: 1,
    id: 1,
    name: "A Perfect Day",
    description:
      "Achieve a fully perfect day (Achieved by having 1+ of every streak at the same time)",
    rewardId: 5,
  },
];

export const useAchievements = create<AchievementStore>()(
  persist(
    (set, get) => ({
      achievements: ALL_ACHIEVEMENTS,

      setAchievements: (achievements) => set({ achievements }),

      addAchievement: (achievement) =>
        set((state) => ({
          achievements: [...state.achievements, achievement],
        })),

      markCompleted: (id) =>
        set((state) => ({
          achievements: state.achievements.map((g) =>
            g.id === id
              ? { ...g, completed: true, completedAt: new Date().toISOString() }
              : g,
          ),
        })),

      getAchievementInfo: (id: string) => {
        const achievement = get().achievements.find(
          (a) => a.id.toString() === id,
        );

        if (!achievement)
          return {
            completion: false,
            progress: 0,
          };

        return evaluateAchievement(achievement, userAPI);
      },
    }),
    {
      name: "achievements",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
