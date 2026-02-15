import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import { getUserWarranties } from "../../../services/warrantyService";
import { getWarrantyStatus } from "../../../utils/warrantyStatus";

export default function WarrantyList() {
  const { user } = useAuth();
  const [warranties, setWarranties] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getUserWarranties(user!.uid);
      setWarranties(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = warranties.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-gray-50 px-6 pt-6">
      <Text className="text-3xl font-bold text-gray-900">My Warranties 🧾</Text>

      <TextInput
        placeholder="Search by product name..."
        value={search}
        onChangeText={setSearch}
        className="mt-4 bg-white px-4 py-3 rounded-xl shadow-md text-gray-800"
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={loadData}
        className="mt-4"
        renderItem={({ item }) => {
          const status = getWarrantyStatus(item.expiryDate);
          return (
            <Link href={`/dashboard/warranties/${item.id}`} asChild>
              <TouchableOpacity className={`mt-4 bg-white p-4 rounded-2xl shadow-md border-l-4 border-[${status.color}]`}>
                <Text className="text-lg font-semibold">{item.productName}</Text>
                <Text className="text-gray-500 mt-1">Expiry: {item.expiryDate}</Text>
                <Text className={`mt-1 font-semibold`} style={{ color: status.color }}>
                  {status.label} {status.label !== "Expired" && `• ${status.daysLeft} days left`}
                </Text>
              </TouchableOpacity>
            </Link>
          );
        }}
      />

     <Link href="/dashboard/warranties/form" asChild>
  <TouchableOpacity className="absolute bottom-8 right-6 bg-blue-600 w-16 h-16 rounded-full items-center justify-center shadow-lg z-50">
    <Text className="text-white text-3xl font-bold">➕</Text>
  </TouchableOpacity>
</Link>

    </View>
  );
}
