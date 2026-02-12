import colors from "@/config/ui-colors";
import { useGoalsStore } from "@/lib/goals/goal-store";
import { useRecordingStore } from "@/lib/records";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const style = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors["activity-primary"],
    borderRadius: 16,
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 24,
    fontWeight: 500,
    color: colors["primary-foreground"],
  },

  subText: {
    fontSize: 20,
    fontWeight: 300,
    marginTop: 36,
    color: colors["primary-foreground"],
  },
});

function ActivityBento() {
  const recordings = useRecordingStore();

  const computeData = () => {
    const today = new Date();
    const records = recordings.recordings
      .filter(
        (r) =>
          r.type === "Activity" &&
          r.date.split("T")[0] === today.toISOString().split("T")[0],
      )
      .reduce((acc, r) => {
        if (r.type !== "Activity") return acc;

        return acc + r.minutes;
      }, 0);

    return records;
  };

  const activity = computeData();

  return (
    <View style={style.container}>
      <View style={style.titleContainer}>
        <Text style={style.text}>Activity</Text>

        <FontAwesome5
          name="walking"
          size={36}
          color={colors["primary-foreground"]}
        />
      </View>
      <Text style={style.subText}>{activity} Minutes</Text>
    </View>
  );
}

export default ActivityBento;
