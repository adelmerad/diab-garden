import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/config/ui-colors";
import { useTaskStore } from "@/lib/daily-tasks";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function DailyTaskManager() {
  const taskStore = useTaskStore();
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;

    taskStore.addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.title}</Text>

      <Pressable onPress={() => taskStore.removeTask(item.id)}>
        <Ionicons name="close" size={22} color={colors.danger} />
      </Pressable>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            placeholder="Add a new task"
            style={styles.input}
          />

          <Pressable style={styles.addButton} onPress={addTask}>
            <Ionicons name="add" size={20} color="white" />
          </Pressable>
        </View>

        <FlatList
          data={taskStore.tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12, paddingTop: 16 }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  formContainer: {
    flexDirection: "row",
    gap: 8,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.muted,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.muted,
    backgroundColor: "white",
  },

  taskText: {
    fontSize: 16,
    color: colors["secondary-foreground"],
  },
});
