import { StyleSheet, Image, Platform, View, Text, Button } from "react-native";
//import { useAuth } from "@/context/AuthContext";
import { useUserStore } from "@/stores/userStore";

export default function TabTwoScreen() {
//  const { logout } = useAuth();
const { logout } = useUserStore();

  return (
    <View style={{ padding: 24, flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 12 }}>Are you sure you want to Logout?</Text>
      <Button title="Yes" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
