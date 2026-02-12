import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/config/ui-colors";
import { Task, useTaskStore } from "@/lib/daily-tasks";
import { Link } from "expo-router";

export default function DailyTasks() {
  const taskStore = useTaskStore();

  const renderItem = ({ item }: { item: Task }) => {
    return (
      <Pressable
        onPress={() => taskStore.toggleTask(item.id)}
        style={[
          styles.taskItem,
          item.completed && {
            borderColor: colors.primary,
          },
        ]}
      >
        <View
          style={[
            styles.iconContainer,
            item.completed && {
              backgroundColor: colors.primary,
              borderColor: colors.primary,
            },
          ]}
        >
          {item.completed && (
            <Ionicons name="checkmark" size={16} color="white" />
          )}
        </View>

        <Text
          style={[styles.taskText, item.completed && { color: colors.primary }]}
        >
          {item.title}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={taskStore.tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={{ gap: 12 }}
      />

      <Link href={"/dailies"} style={styles.manageButton}>
        <Text style={styles.manageText}>Manage daily tasks</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },

  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors["muted"],
    backgroundColor: "white",
    gap: 12,
  },

  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#AAA",
    justifyContent: "center",
    alignItems: "center",
  },

  taskText: {
    fontSize: 16,
    color: colors["secondary-foreground"],
  },

  manageButton: {
    marginTop: 8,
    paddingVertical: 12,
    alignItems: "center",
  },

  manageText: {
    color: colors.primary,
    fontWeight: "600",
  },
});
