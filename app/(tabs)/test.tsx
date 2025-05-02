import { TextInput, View, Text, Button, StyleSheet, Pressable } from "react-native";
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
         style={styles.input} 
         placeholder="Type here..." 
       />
       <TextInput 
         value={userName} 
         onChangeText={setUserName} 
         style={styles.input} 
         placeholder="Type here..." 
       />
      <Button title="Submit" onPress={handleSubmit}></Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 5,
    width: "100%",
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, 
    fontSize: 16,
    color: "#333",
    fontFamily: "Arial",
    textAlign: "left",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#007BFF",
  },
});