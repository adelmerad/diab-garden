import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface PersonalGoal {
  waterIntake: number;
  activity: number;
  calories: number;
  carbs: number;
  sleepHours: number;
  meals: number;
}

const defaultPersonalGoals: PersonalGoal = {
  waterIntake: 2000,
  activity: 30,
  calories: 2000,
  carbs: 250,
  sleepHours: 8,
  meals: 3,
};

interface PersonalGoalStore {
  goals: PersonalGoal;

  setGoals: (partial: Partial<PersonalGoal>) => void;
  resetGoals: () => void;
}

export const usePersonalGoalStore = create<PersonalGoalStore>()(
  persist(
    (set) => ({
      goals: defaultPersonalGoals,

      setGoals: (partial) =>
        set((state) => ({
          goals: {
            ...state.goals,
            ...partial,
          },
        })),

      resetGoals: () =>
        set({
          goals: defaultPersonalGoals,
        }),
    }),
    {
      name: "personal_goals",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
