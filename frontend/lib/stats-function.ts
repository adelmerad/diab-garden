import { Recording, TrackedMetrics } from "@/config/types";

export const getSleepTime = (start: string, end: string) => {
  let time = 0;
  const startNum = Number(start);
  const endNum = Number(end);

  if (endNum < startNum) {
    time = 24 - startNum + endNum;
  } else {
    time = endNum - startNum;
  }

  return time;
};

export const getStatsCalculator = (
  type: TrackedMetrics,
  recordings: Recording[],
) => {
  return () => {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    const filtered = recordings.filter(
      (r) => r.type === type && new Date(r.date) >= weekAgo,
    );

    if (filtered.length === 0) return { avg: 0, min: 0, max: 0 };

    const values = filtered.map((r: Recording) => {
      switch (r.type) {
        case "Glucose":
          return r.value;
        case "Activity":
          return r.minutes;
        case "Diet":
          return r.calories;
        case "Water":
          return r.ml;
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
  };
};
