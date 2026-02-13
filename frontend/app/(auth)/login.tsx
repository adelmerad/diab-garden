import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/config/ui-colors";
import { useAuthStore } from "@/lib/auth-store";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useAuthStore();

  const handleLogin = () => {
    // Add your login logic here
    // For now, just navigate to the main app
    // FIXME: Make login work with backend
    setToken("secret-dev-token");
    router.replace("/(tabs)/home");
  };

  const handleSocialLogin = (provider: string) => {
    // Add social login logic here
    // FIXME: Make login work with backend
    setToken("secret-dev-token");
    console.log(`Login with ${provider}`);
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Login Title */}
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email or Phone number"
        placeholderTextColor="#A0AEC0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#A0AEC0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#A0AEC0"
          />
        </Pressable>
      </View>

      {/* Forgot Password */}
      <Pressable onPress={() => console.log("Forgot password")}>
        <Text style={styles.forgotPassword}>Forget Your Password?</Text>
      </Pressable>

      {/* Login Button */}
      <Pressable
        style={({ pressed }) => [
          styles.loginButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>

      {/* Or Login with */}
      <Text style={styles.orText}>Or Login with</Text>

      {/* Social Login Buttons */}
      <View style={styles.socialContainer}>
        <Pressable
          style={styles.socialButton}
          onPress={() => handleSocialLogin("Facebook")}
        >
          <Ionicons name="logo-facebook" size={28} color="#1877F2" />
        </Pressable>
        <Pressable
          style={styles.socialButton}
          onPress={() => handleSocialLogin("Google")}
        >
          <Ionicons name="logo-google" size={28} color="#DB4437" />
        </Pressable>
        <Pressable
          style={styles.socialButton}
          onPress={() => handleSocialLogin("X")}
        >
          <Text style={styles.xLogo}>𝕏</Text>
        </Pressable>
      </View>

      {/* Sign Up Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have account? </Text>
        <Pressable onPress={() => router.push("/signup")}>
          <Text style={styles.signupLink}>Sign up</Text>
        </Pressable>
      </View>

      {/* Terms */}
      <Text style={styles.terms}>
        By continuing, you agree to our Terms{"\n"}and Privacy Policy
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  logoContainer: {
    marginBottom: 25,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 55,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 15,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    color: "#2D3748",
  },
  passwordContainer: {
    width: "100%",
    height: 55,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 20,
    fontSize: 15,
    color: "#2D3748",
  },
  eyeIcon: {
    paddingRight: 15,
  },
  forgotPassword: {
    color: colors.primary,
    fontSize: 14,
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  loginButton: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  orText: {
    color: "#718096",
    fontSize: 14,
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  xLogo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  signupContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  signupText: {
    color: "#718096",
    fontSize: 14,
  },
  signupLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  terms: {
    color: "#A0AEC0",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});
