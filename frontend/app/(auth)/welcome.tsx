import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import colors from "@/config/ui-colors";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      {/* Top decorative circles */}
      <View style={styles.topCircle1} />
      <View style={styles.topCircle2} />

      {/* Logo/Icon area */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Welcome text */}
      <Text style={styles.welcomeText}>WELCOME !</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Every small step you take today{"\n"}helps protect your health tomorrow
      </Text>

      {/* Start button */}
      <Link href="/(auth)/login" style={styles.startContainer}>
        <Text style={styles.buttonText}>Start</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  topCircle1: {
    position: "absolute",
    top: -100,
    left: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#7DD4C7",
    opacity: 0.6,
  },

  startContainer: {
    paddingVertical: 16,
    paddingHorizontal: 72,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors["primary"],
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  logoContainer: {},

  topCircle2: {
    position: "absolute",
    top: -50,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#B4E7DD",
    opacity: 0.5,
  },
  logo: {
    width: 220,
    height: 220,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#4A5568",
    marginBottom: 20,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 15,
    color: "#718096",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 60,
    paddingHorizontal: 40,
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: colors["primary-foreground"],
    fontSize: 20,
    fontWeight: "600",
  },
});
