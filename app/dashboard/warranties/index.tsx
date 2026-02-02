import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import { getUserWarranties } from "../../../services/warrantyService";

export default function WarrantyList() {
  const { user } = useAuth();
  const [warranties, setWarranties] = useState<any[]>([]);

  useEffect(() => {
    if (user) loadData();
  }, []);

  const loadData = async () => {
    const data = await getUserWarranties(user!.uid);
    setWarranties(data);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F8F9FF" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        My Warranties 🧾
      </Text>

      <FlatList
        data={warranties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <Link href={{ pathname: "/dashboard/warranties/[id]", params: { id: item.id } }} asChild>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 18,
                borderRadius: 18,
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {item.productName}
              </Text>
              <Text style={{ color: "gray" }}>
                Expiry: {item.expiryDate}
              </Text>
            </TouchableOpacity>
          </Link>
        )}
      />

      {/* Add Warranty Button */}
      <Link href="/dashboard/warranties/form" asChild>
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: "#5A67F2",
            padding: 18,
            borderRadius: 18,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            ➕ Add Warranty
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
