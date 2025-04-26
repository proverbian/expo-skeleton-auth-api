import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [username, setUsername] = useState("shiloh");
  const [password, setPassword] = useState("Passw0rd1");
  const { login } = useAuthStore();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(username, password);
      router.replace("/"); // go to tabs
    } catch (err) {
      Alert.alert("Login failed", "Check credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Email" />
      <TextInput
        style={styles.input}
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        placeholder="Password"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 16 },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
});
