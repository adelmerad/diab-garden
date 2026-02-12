import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import colors from "@/config/ui-colors";
export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      // Check if user has authentication token
      const token = await AsyncStorage.getItem("authToken");
      const hasCompletedOnboarding = await AsyncStorage.getItem("hasCompletedOnboarding");
      
      setIsAuthenticated(!!token);
      setIsLoading(false);
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  // Show loading spinner while checking authentication
  if (isLoading || isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.primary }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  // Not authenticated - go to welcome screen
  return <Redirect href="/(auth)/welcome" />;
}