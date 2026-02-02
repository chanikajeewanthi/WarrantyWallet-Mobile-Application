import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../../../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace("../dashboard");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FF", padding: 25 }}>
      <Text style={{ fontSize: 32, fontWeight: "bold", marginTop: 80 }}>
        WarrantyWallet 💳
      </Text>

      <Text style={{ fontSize: 16, color: "gray", marginTop: 8 }}>
        Login to continue
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
        onPress={handleLogin}
        style={{
          marginTop: 25,
          backgroundColor: "#5A67F2",
          padding: 18,
          borderRadius: 18,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Login</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 20, textAlign: "center" }}>
        New user?{" "}
        <Link href="/auth/register" style={{ color: "#5A67F2" }}>
          Register
        </Link>
      </Text>
    </View>
  );
}
