import colors from "@/config/ui-colors";
import { useRecordingStore } from "@/lib/records";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View, Text } from "react-native";

const style = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors["glucose-primary"],
    borderRadius: 16,
  },

  text: {
    fontSize: 24,
    fontWeight: 500,
    color: colors["primary-foreground"],
  },

  subText: {
    fontSize: 12,
    fontWeight: 300,
    color: colors["primary-foreground"],
  },
});

function GlucoseBento() {
  // FIXME: Change to using Backend

  const recordings = useRecordingStore();

  const computeData = () => {
    const records = recordings.recordings
      .filter((r) => r.type === "Glucose")
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )[0] ?? { value: 0 };

    return records.value;
  };

  const data = {
    value: computeData(),
    unit: "mg/dL",
  };

  return (
    <View style={style.container}>
      <Text style={style.text}>Glucose</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Fontisto
          name="heartbeat-alt"
          color={colors["primary-foreground"]}
          size={48}
        />
      </View>
      <Text style={style.subText}>
        {data.value} {data.unit}
      </Text>
    </View>
  );
}

export default GlucoseBento;
