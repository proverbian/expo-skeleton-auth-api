import { View, Text, Button } from "react-native";
import { useAuthStore } from "@/stores/authStore";

export default function HomeScreen() {
  const { user, logout } = useAuthStore();

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ marginBottom: 12 }}>Welcome, {user?.name}!</Text>
      <Text style={{ marginBottom: 12 }}>Email: {user?.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
