import { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useRecordingStore } from "@/lib/records";
import colors from "@/config/ui-colors";
import { getStatsCalculator } from "@/lib/stats-function";
import StatBlock from "../stat-block";
import { tips } from "@/config/tips";

export default function SleepView() {
  const addRecording = useRecordingStore((s) => s.addRecording);
  const recordings = useRecordingStore((s) => s.recordings);

  const stats = useMemo(getStatsCalculator("Sleep", recordings), [recordings]);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const validHour = (t: string) => Number(t) < 24 && Number(t) > 0;

  const submit = () => {
    if (!end || !start) return;
    if (!validHour(end) || !validHour(start)) return;

    addRecording({
      id: Date.now().toString(),
      type: "Sleep",
      date: new Date().toISOString(),
      start,
      end,
    });

    setEnd("");
    setStart("");
  };

  return (
    <View style={{ gap: 16 }}>
      {/* Form */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          Enter New Sleep Recording
        </Text>
      </View>

      <TextInput
        placeholder="Sleep Start Time (hour)"
        keyboardType="numeric"
        value={start}
        onChangeText={setStart}
        style={{ borderWidth: 1, padding: 8, borderRadius: 12 }}
      />

      <TextInput
        placeholder="Sleep End Time (hour)"
        keyboardType="numeric"
        value={end}
        onChangeText={setEnd}
        style={{ borderWidth: 1, padding: 8, borderRadius: 12 }}
      />

      <Pressable
        onPress={submit}
        style={{
          padding: 12,
          backgroundColor: colors["primary"],
          alignItems: "center",
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "white" }}>Add</Text>
      </Pressable>

      {/* Tip */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 8,
          backgroundColor: colors["secondary"],
          borderColor: colors["primary"],
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: colors["secondary-foreground"],
            fontSize: 16,
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Tip: {tips[Math.floor(Math.random() * tips.length)]}
        </Text>
      </View>
      {/* Stats */}
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
          }}
        >
          Weekly Overview
        </Text>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: colors["muted"],
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <StatBlock title={"Avg"} value={stats.avg.toFixed(1)} />
        <StatBlock title={"Min"} value={"" + stats.min} />
        <StatBlock title={"Max"} value={"" + stats.max} />
      </View>
    </View>
  );
}
