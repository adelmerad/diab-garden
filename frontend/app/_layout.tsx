import Header from "@/components/header";
import { useAuthStore } from "@/lib/auth-store";
import { useTaskStore } from "@/lib/daily-tasks";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { AppState } from "react-native";

export default function RootLayout() {
  const { checkForDayReset, currentDate, completedToday } = useTaskStore();

  useEffect(() => {
    checkForDayReset();
    // The app can stay open in the background past midnight: check again when it comes back
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") checkForDayReset();
    });
    return () => subscription.remove();
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="dailies"
        options={{
          header: (props) => (
            <Header options={{ title: props.options.title }} />
          ),
          title: `Manage Daily Tasks::Create & manage dailies (${currentDate}, done: ${completedToday ? "YES!" : "Not yet"})`,
        }}
      />
      <Stack.Screen
        name="achievements"
        options={{
          header: (props) => (
            <Header options={{ title: props.options.title }} />
          ),
          title: `Achievements::See all the possible achievements to unlock more unique plants for your gardem`,
        }}
      />
    </Stack>
  );
}
