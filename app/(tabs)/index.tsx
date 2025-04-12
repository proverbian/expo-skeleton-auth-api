// app/(tabs)/index.tsx
import { View, Text, Button } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { logout } = useAuth();

  return (
    <View style={{ padding: 24 }}>
      <Text>Welcome! You're logged in 🎉</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
