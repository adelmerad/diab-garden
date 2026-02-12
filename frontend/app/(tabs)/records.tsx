import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TrackedMetrics } from "@/config/types";

import GlucoseView from "@/components/record-voews/glucose-view";
import ActivityView from "@/components/record-voews/activity-view";
import WaterView from "@/components/record-voews/water-view";
import SleepView from "@/components/record-voews/sleep-view";
import DietView from "@/components/record-voews/diet-view";

const selections: TrackedMetrics[] = [
  "Glucose",
  "Activity",
  "Water",
  "Sleep",
  "Diet",
];

export default function RecordingScreen() {
  const [type, setType] = useState<TrackedMetrics>("Glucose");

  const renderView = () => {
    switch (type) {
      case "Glucose":
        return <GlucoseView />;
      case "Activity":
        return <ActivityView />;
      case "Water":
        return <WaterView />;
      case "Sleep":
        return <SleepView />;
      case "Diet":
        return <DietView />;
    }
  };

  return (
    <View style={styles.container}>
      <Picker selectedValue={type} onValueChange={(v) => setType(v)}>
        {selections.map((s) => (
          <Picker.Item key={s} label={s} value={s} />
        ))}
      </Picker>
      {renderView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
});
