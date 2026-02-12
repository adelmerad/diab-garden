import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskStore = {
  tasks: Task[];
  currentDate: string;
  completedToday: boolean;
  history: string[]; // dates user completed all tasks

  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;

  getMeta: () => {
    total: number;
    completed: number;
    progress: number;
  };

  checkForDayReset: () => void;
};

const defaultTasks: Task[] = [
  { id: "1", title: "Take medication", completed: false },
  { id: "2", title: "Check fasting glucose", completed: false },
  { id: "3", title: "10-minute walk", completed: false },
];

const todayString = () => new Date().toISOString().split("T")[0];

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: defaultTasks,
      currentDate: todayString(),
      completedToday: false,
      history: [],

      addTask: (title) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now().toString(),
              title: title.trim(),
              completed: false,
            },
          ],
        })),

      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      toggleTask: (id) =>
        set((state) => {
          const updated = state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t,
          );

          const total = updated.length;
          const completed = updated.filter((t) => t.completed).length;

          const progress = total === 0 ? 0 : completed / total;

          let completedToday = state.completedToday;
          let history = state.history;

          // Lock completion if reached 100%
          if (progress === 1 && !state.completedToday) {
            completedToday = true;
            history = [...state.history, state.currentDate];
          }

          return {
            tasks: updated,
            completedToday,
            history,
          };
        }),

      getMeta: () => {
        const tasks = get().tasks;
        const total = tasks.length;
        const completed = tasks.filter((t) => t.completed).length;

        return {
          total,
          completed,
          progress: total === 0 ? 0 : completed / total,
        };
      },

      checkForDayReset: () =>
        set((state) => {
          const today = todayString();

          if (state.currentDate === today) return state;

          // reset tasks but keep structure
          const resetTasks = state.tasks.map((t) => ({
            ...t,
            completed: false,
          }));

          return {
            tasks: resetTasks,
            currentDate: today,
            completedToday: false,
          };
        }),
    }),
    {
      name: "daily_tasks",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
