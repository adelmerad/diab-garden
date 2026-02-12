import colors from "@/config/ui-colors";
import { useRecordingStore } from "@/lib/records";
import { usePersonalGoalStore } from "@/lib/use-personal-goals";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { StyleSheet, View, Text } from "react-native";

const style = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: colors["diet-primary"],
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
    fontSize: 16,
    fontWeight: 300,
    color: colors["primary-foreground"],
    textAlign: "center",
  },

  mealText: {
    fontSize: 28,
    fontWeight: 800,
    color: colors["primary-foreground"],
  },

  Dietcontainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
    gap: 16,
  },
});

function DietBento() {
  const recordings = useRecordingStore();
  const goals = usePersonalGoalStore();

  const computeData = () => {
    const today = new Date();
    const records = recordings.recordings
      .filter(
        (r) =>
          r.type === "Diet" &&
          r.date.split("T")[0] === today.toISOString().split("T")[0],
      )
      .reduce(
        (acc, r) => {
          if (r.type !== "Diet") return acc;

          return {
            sugar: acc.sugar + r.carbs,
            meals: acc.meals + (r.calories >= 350 ? 1 : 0),
          };
        },
        {
          sugar: 0,
          meals: 0,
        },
      );

    return {
      sugar: {
        value: records.sugar,
        max: goals.goals.carbs,
      },
      meals: {
        value: records.meals,
        max: goals.goals.meals,
      },
    };
  };

  const diet = computeData();

  return (
    <View style={style.container}>
      <View style={style.titleContainer}>
        <Text style={style.text}>Diet</Text>
      </View>
      <View style={style.Dietcontainer}>
        <Text style={style.mealText}>
          {diet.meals.value}/{diet.meals.max}
        </Text>
        <FontAwesome6
          name="bowl-food"
          size={24}
          color={colors["primary-foreground"]}
        />
      </View>
      <Text style={style.subText}>
        {diet.sugar.value}/{diet.sugar.max} Grams of sugar
      </Text>
    </View>
  );
}

export default DietBento;
