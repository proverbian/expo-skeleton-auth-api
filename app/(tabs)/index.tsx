import { TextInput, View, Text, Button } from "react-native";
import { useAuthStore } from "@/stores/authStore";
import api from "@/api";
import { useState } from "react";


export default function HomeScreen() {
  const { user, logout, setUser } = useAuthStore();
  const [userName, setUserName] = useState(user?.name);

  const handleSubmit = () => {
    api.put("/me", { name: userName })
      .then((response) => {
        const updatedUser = response.data;
        setUser(updatedUser);
        console.log("User updated successfully:", updatedUser);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
    console.log("Form submitted");
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ marginBottom: 12 }}>Welcome, {user?.name}!</Text>
      <Text style={{ marginBottom: 12 }}>Email: {user?.email}</Text>
       <TextInput 
         value={userName} 
         onChangeText={setUserName} 
         style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} 
         placeholder="Type here..." 
       />
      <Button title="Submit" onPress={handleSubmit}></Button>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
