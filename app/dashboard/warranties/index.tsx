import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import { getUserWarranties } from "../../../services/warrantyService";
import { getWarrantyStatus } from "../../../utils/warrantyStatus";
import { TextInput } from "react-native";

export default function WarrantyList() {
  const { user } = useAuth();
  const [warranties, setWarranties] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    if (user) loadData();
  }, []);

  // const loadData = async () => {
  //   const data = await getUserWarranties(user!.uid);
  //   setWarranties(data);
  // };

  const loadData = async () => {
    try {
      const data = await getUserWarranties(user!.uid);
      setWarranties(data);
    } catch (error) {
      console.log("Failed to load warranties", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };


  const filteredWarranties = warranties.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F8F9FF" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        My Warranties 🧾
      </Text>


      <FlatList
        data={filteredWarranties}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}

        renderItem={({ item }) => {
          const status = getWarrantyStatus(item.expiryDate);

          return (
            <Link href={`/dashboard/warranties/${item.id}`} asChild>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  padding: 18,
                  borderRadius: 18,
                  marginTop: 15,
                  borderLeftWidth: 6,
                  borderLeftColor: status.color,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  {item.productName}
                </Text>

                <Text style={{ color: "gray", marginTop: 4 }}>
                  Expiry: {item.expiryDate}
                </Text>

                <Text
                  style={{
                    marginTop: 6,
                    fontWeight: "600",
                    color: status.color,
                  }}
                >
                  {status.label}
                  {status.label !== "Expired" && ` • ${status.daysLeft} days left`}
                </Text>
              </TouchableOpacity>
            </Link>
          );
        }}
      />

      <TextInput
        placeholder="Search by product name..."
        value={search}
        onChangeText={setSearch}
        style={{
          marginTop: 15,
          backgroundColor: "white",
          padding: 14,
          borderRadius: 14,
          fontSize: 16,
        }}
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
