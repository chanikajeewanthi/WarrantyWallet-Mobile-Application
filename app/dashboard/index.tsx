import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FF", padding: 20 }}>
      
      {/* Title */}
      <Text style={{ fontSize: 26, fontWeight: "bold", marginTop: 30 }}>
        My Dashboard 📌
      </Text>

      <Text style={{ marginTop: 10, color: "gray" }}>
        Track all warranties in one place
      </Text>

      {/* Navigation Button */}
      <Link href="/dashboard/warranties" asChild>
        <TouchableOpacity
          style={{
            marginTop: 30,
            backgroundColor: "white",
            padding: 20,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOpacity: 0.1,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            📄 View My Warranties →
          </Text>
        </TouchableOpacity>
      </Link>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={logout}
        style={{
          marginTop: 30,
          backgroundColor: "#EF4444",
          padding: 18,
          borderRadius: 18,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
