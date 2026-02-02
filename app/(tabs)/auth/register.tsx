import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../../../context/AuthContext";

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await register(email, password);
      Alert.alert("Success", "Account Created!");
      router.replace("../dashboard");
    } catch (error: any) {
      Alert.alert("Register Failed", error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FF", padding: 25 }}>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 80 }}>
        Create Account ✨
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          marginTop: 40,
          backgroundColor: "white",
          padding: 15,
          borderRadius: 15,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          marginTop: 15,
          backgroundColor: "white",
          padding: 15,
          borderRadius: 15,
        }}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          marginTop: 25,
          backgroundColor: "#22C55E",
          padding: 18,
          borderRadius: 18,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Register</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 20, textAlign: "center" }}>
        Already have account?{" "}
        <Link href="/auth/login" style={{ color: "#22C55E" }}>
          Login
        </Link>
      </Text>
    </View>
  );
}
