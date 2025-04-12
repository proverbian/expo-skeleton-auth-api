import { StyleSheet, Image, Platform, View, Text, Button } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAuth } from "@/context/AuthContext";

export default function TabTwoScreen() {
  const { logout } = useAuth();

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
