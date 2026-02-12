import { TrackedMetrics } from "@/config/types";
import { View, Text, StyleSheet } from "react-native";
import GlucoseBento from "./tracker-bento/glucose-bento";
import ActivityBento from "./tracker-bento/activity-bento";
import WaterBento from "./tracker-bento/water-bento";
import StreakBento from "./tracker-bento/streak-bento";
import SleepBento from "./tracker-bento/sleep-bento";
import DietBento from "./tracker-bento/diet-bento";

export type TrackerBentoProps = {
  type: TrackedMetrics | "Streak";
};

function TrackerBento(props: TrackerBentoProps) {
  if (props.type === "Glucose") return <GlucoseBento />;
  if (props.type === "Activity") return <ActivityBento />;
  if (props.type === "Water") return <WaterBento />;
  if (props.type === "Streak") return <StreakBento />;
  if (props.type === "Sleep") return <SleepBento />;
  if (props.type === "Diet") return <DietBento />;
}

export default TrackerBento;
