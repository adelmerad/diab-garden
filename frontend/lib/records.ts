import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Recording, TrackedMetrics } from "@/config/types";
import { getSleepTime } from "./stats-function";

type RecordingStore = {
  recordings: Recording[];
  addRecording: (recording: Recording) => void;
  getWeeklyStats: (type: TrackedMetrics) => {
    avg: number;
    min: number;
    max: number;
  };
};

export const useRecordingStore = create<RecordingStore>()(
  persist(
    (set, get) => ({
      recordings: [],

      addRecording: (recording) =>
        set((state) => ({
          recordings: [...state.recordings, recording],
        })),

      getWeeklyStats: (type) => {
        const now = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);

        const filtered = get().recordings.filter(
          (r) => r.type === type && new Date(r.date) >= weekAgo,
        );

        if (filtered.length === 0) return { avg: 0, min: 0, max: 0 };

        const values = filtered.map((r) => {
          switch (r.type) {
            case "Glucose":
              return r.value;
            case "Activity":
              return r.minutes;
            case "Water":
              return r.ml;
            case "Diet":
              return r.calories;
            case "Sleep":
              return getSleepTime(r.start, r.end);
          }
        });

        const sum = values.reduce((a, b) => a + b, 0);
        return {
          avg: sum / values.length,
          min: Math.min(...values),
          max: Math.max(...values),
        };
      },
    }),
    {
      name: "recordings",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
