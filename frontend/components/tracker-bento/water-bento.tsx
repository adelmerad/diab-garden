import colors from "@/config/ui-colors";
import { StyleSheet, View, Text } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRecordingStore } from "@/lib/records";
import { usePersonalGoalStore } from "@/lib/use-personal-goals";

const style = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors["water-primary"],
    justifyContent: "flex-start",
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

  waterMeter: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    flex: 1,
    gap: 8,
    paddingVertical: 8,
  },
});

function WaterBento() {
  const recordings = useRecordingStore();
  const goals = usePersonalGoalStore();

  const computeData = () => {
    const today = new Date();
    const records = recordings.recordings
      .filter(
        (r) =>
          r.type === "Water" &&
          r.date.split("T")[0] === today.toISOString().split("T")[0],
      )
      .reduce((acc, r) => {
        if (r.type !== "Water") return acc;

        return acc + Math.round(r.ml / 250);
      }, 0);

    return {
      value: records,
      max: Math.round(goals.goals.waterIntake / 250),
    };
  };

  const water = computeData();

  return (
    <View style={style.container}>
      <View style={style.titleContainer}>
        <Text style={style.text}>Water</Text>

        <FontAwesome6
          name="glass-water"
          size={36}
          color={colors["primary-foreground"]}
        />
      </View>
      <View style={style.waterMeter}>
        {Array.from({ length: water.max }).map((_, index) => {
          const filled = index < water.value;

          return (
            <Ionicons
              key={index}
              name={filled ? "water" : "water-outline"}
              size={16}
              color={colors["primary-foreground"]}
            />
          );
        })}
      </View>
      <Text style={style.subText}>
        {water.value} Out of {water.max}
      </Text>
    </View>
  );
}

export default WaterBento;
