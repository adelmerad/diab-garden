import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearAllStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage cleared successfully");
  } catch (error) {
    console.error("Failed to clear AsyncStorage:", error);
  }
};
