import DailyTasks from "@/components/DailyTasks";
import { ProgressBar } from "@/components/progress";
import TrackerBento from "@/components/TrackerBento";
import { useAuthStore } from "@/lib/auth-store";
import { useTaskStore } from "@/lib/daily-tasks";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  healthTrackerContainer: {
    marginVertical: 32,
    marginBottom: 32,
    paddingHorizontal: 16,
  },

  bentoContainer: {
    flexDirection: "row",
    gap: 16,
  },

  mainContainer: {
    flex: 1,
    gap: 16,
  },

  bentoColumn: {
    flexDirection: "column",
    flex: 1,
    gap: 16,
  },

  bentoText: {
    fontSize: 24,
  },

  progressContainer: {
    width: "90%",
    gap: 16,
  },

  progressText: {
    fontSize: 24,
    fontWeight: 800,
    paddingHorizontal: 16,
  },
});

function Home() {
  const [progress, setProgress] = useState<number>(0);
  const taskStore = useTaskStore();
  const { token, removeToken } = useAuthStore();
  const hasHydrated = useAuthStore.persist.hasHydrated();

  if (!hasHydrated) return null;
  if (!token) return <Redirect href="/(auth)/welcome" />;

  useEffect(() => {
    setProgress(taskStore.getMeta().progress * 100);
  }, [taskStore.tasks]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
    >
      <View style={styles.healthTrackerContainer}>
        <Text style={styles.bentoText}>Health tracker</Text>
        <View style={styles.bentoContainer}>
          <View style={styles.bentoColumn}>
            <TrackerBento type="Activity" />
            <TrackerBento type="Streak" />
            <TrackerBento type="Diet" />
          </View>
          <View style={styles.bentoColumn}>
            <TrackerBento type="Water" />
            <TrackerBento type="Glucose" />
            <TrackerBento type="Sleep" />
          </View>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Daily Progress</Text>
        <ProgressBar progress={progress} height={12} />
      </View>

      <View>
        <DailyTasks />
      </View>
    </ScrollView>
  );
}

export default Home;
