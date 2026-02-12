import colors from "@/config/ui-colors";
import { useRecordingStore } from "@/lib/records";
import { getSleepTime } from "@/lib/stats-function";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { StyleSheet, View, Text } from "react-native";

const style = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: colors["sleep-primary"],
    borderRadius: 16,
    alignItems: "center",
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
    color: colors["primary-foreground"],
  },

  subText2: {
    fontSize: 16,
    fontWeight: 200,
    color: colors["primary-foreground"],
  },

  Sleepcontainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});

function SleepBento() {
  const StaticSleepData = {
    value: 7,
  };

  const recordings = useRecordingStore();

  const computeData = () => {
    const records = recordings.recordings
      .filter((r) => r.type === "Sleep")
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )[0] ?? { start: 0, end: 0 };

    return records;
  };

  const lastSleep = computeData();
  const data = {
    value: getSleepTime(lastSleep.start, lastSleep.end),
  };

  return (
    <View style={style.container}>
      <View style={style.titleContainer}>
        <Text style={style.text}>Sleep</Text>
      </View>
      <View style={style.Sleepcontainer}>
        <FontAwesome6
          name="bed-pulse"
          size={24}
          color={colors["primary-foreground"]}
        />
      </View>
      <Text style={style.subText}>{data.value} Hours</Text>
      {6 <= data.value && data.value <= 9 && (
        <Text style={style.subText2}>Great, Keep it up</Text>
      )}
    </View>
  );
}

export default SleepBento;
