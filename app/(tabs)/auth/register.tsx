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
      Alert.alert("Success", "Account Created!", [
        {
          text: "OK",
          onPress: () => router.replace("/auth/login"),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Register Failed", error.message);
    }
  };


  return (
    <View className="flex-1 bg-[#F7F8FC] px-6 pt-24">

      <Text className="text-3xl font-extrabold text-gray-900 text-center">
        Create Account ✨
      </Text>
      <Text className="text-center text-gray-500 text-sm mt-2 mb-12">
        Start tracking your warranties safely
      </Text>


      <View className="space-y-8">


        <View className="bg-white rounded-2xl px-6 py-5 shadow-lg border border-gray-100">
          <Text className="text-gray-500 text-xs font-semibold mb-1">Email</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            className="bg-[#F4F5F7] rounded-xl px-4 py-3 text-gray-900 text-[15px]"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>


        <View className="bg-white rounded-2xl px-6 py-5 shadow-lg border border-gray-100">
          <Text className="text-gray-500 text-xs font-semibold mb-1">Password</Text>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="bg-[#F4F5F7] rounded-xl px-4 py-3 text-gray-900 text-[15px]"
          />
        </View>
      </View>


      <TouchableOpacity
        onPress={handleRegister}
        activeOpacity={0.9}
        className="mt-12 py-4 rounded-2xl shadow-xl items-center"
        style={{ backgroundColor: "#9a1e8a" }}
      >
        <Text className="text-white text-lg font-semibold tracking-wide">
          Register
        </Text>
      </TouchableOpacity>


      <Text className="mt-6 text-center text-gray-600 text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" asChild>
          <Text className="text-blue-600 font-semibold">Login</Text>
        </Link>
      </Text>
    </View>
  );
}
