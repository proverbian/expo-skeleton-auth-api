// app/_layout.tsx
import { useEffect } from "react";
import { Slot, useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "@/stores/authStore";

export default function RootLayout() {
  const { user, loading, fetchUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchUser(); // 👈 Fetch user unconditionally
  }, []);

  useEffect(() => {
    if (!loading) {
      // Redirect logic when loading completes
      if (!user) router.replace("/login");
      else router.replace("/"); // Or your home screen
    }
  }, [loading, user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}