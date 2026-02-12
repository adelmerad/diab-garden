import colors from "@/config/ui-colors";
import { useTaskStore } from "@/lib/daily-tasks";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { StyleSheet, View, Text } from "react-native";

const style = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors["streak-primary"],
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

  Streakcontainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});

function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const dateObjs = dates.map((d) => new Date(d));

  dateObjs.sort((a, b) => b.getTime() - a.getTime());

  let streak = 1;
  for (let i = 1; i < dateObjs.length; i++) {
    const prev = dateObjs[i - 1];
    const curr = dateObjs[i];

    const diffDays = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
}

function StreakBento() {
  // FIXME: Change to using Backend

  const dailies = useTaskStore();

  const computeData = () => {
    const records = dailies.history;
    return calculateStreak(records);
  };

  const data = computeData();

  return (
    <View style={style.container}>
      <View style={style.titleContainer}>
        <Text style={style.text}>Streak</Text>
      </View>
      <View style={style.Streakcontainer}>
        <FontAwesome6 name="fire" size={32} color={colors["streak-flame"]} />
      </View>
      <Text style={style.subText}>{data} Days!</Text>
    </View>
  );
}

export default StreakBento;
