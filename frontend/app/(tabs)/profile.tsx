import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { usePersonalGoalStore } from "@/lib/use-personal-goals";
import colors from "@/config/ui-colors";
import { clearAllStorage } from "@/lib/clearAsyncStorage";

type GoalInputProps = {
  label: string;
  value: number;
  onChange: (value: string) => void;
};

function GoalInput({ label, value, onChange }: GoalInputProps) {
  return (
    <View>
      <Text style={{ marginBottom: 6 }}>{label}</Text>

      <TextInput
        value={String(value)}
        onChangeText={onChange}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 12,
        }}
      />
    </View>
  );
}

export default function Profile() {
  const goals = usePersonalGoalStore((s) => s.goals);
  const setGoals = usePersonalGoalStore((s) => s.setGoals);

  const [form, setForm] = useState(goals);

  useEffect(() => {
    setForm(goals);
  }, [goals]);

  const updateField = (key: keyof typeof form, value: string) => {
    const numeric = Number(value) || 0;

    setForm((prev) => ({
      ...prev,
      [key]: numeric,
    }));
  };

  const handleSave = () => {
    setGoals(form);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Personal Goals</Text>

      <GoalInput
        label="Daily Water Intake (ml)"
        value={form.waterIntake}
        onChange={(v) => updateField("waterIntake", v)}
      />

      <GoalInput
        label="Daily Activity (minutes)"
        value={form.activity}
        onChange={(v) => updateField("activity", v)}
      />

      <GoalInput
        label="Daily Calories"
        value={form.calories}
        onChange={(v) => updateField("calories", v)}
      />

      <GoalInput
        label="Daily Carbs (g)"
        value={form.carbs}
        onChange={(v) => updateField("carbs", v)}
      />

      <GoalInput
        label="Daily Meals (350cal+)"
        value={form.meals}
        onChange={(v) => updateField("meals", v)}
      />

      <GoalInput
        label="Sleep Hours"
        value={form.sleepHours}
        onChange={(v) => updateField("sleepHours", v)}
      />

      <TouchableOpacity
        onPress={handleSave}
        style={{
          marginTop: 20,
          paddingVertical: 16,
          borderRadius: 12,
          borderWidth: 2,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "600" }}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={clearAllStorage}
        style={{
          marginTop: 20,
          paddingVertical: 8,
          borderRadius: 12,
          borderWidth: 2,
          alignItems: "center",
          borderColor: colors.danger,
        }}
      >
        <Text style={{ fontWeight: "600" }}>Clear Cache</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
