import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getWarrantyById, deleteWarranty } from "../../../services/warrantyService";

export default function WarrantyDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [warranty, setWarranty] = useState<any>(null);

  useEffect(() => {
    loadWarranty();
  }, []);

  const loadWarranty = async () => {
    const data = await getWarrantyById(id as string);
    setWarranty(data);
  };

  const handleDelete = async () => {
    await deleteWarranty(id as string);
    Alert.alert("Deleted", "Warranty removed!");
    router.replace("/dashboard/warranties" as any);
  };

  if (!warranty) return null;

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F8F9FF" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {warranty.productName}
      </Text>

      <Text style={{ marginTop: 10 }}>Brand: {warranty.brand}</Text>
      <Text>Seller: {warranty.seller}</Text>
      <Text>Expiry Date: {warranty.expiryDate}</Text>

      <TouchableOpacity
        onPress={handleDelete}
        style={{
          marginTop: 30,
          backgroundColor: "#EF4444",
          padding: 18,
          borderRadius: 18,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          Delete Warranty
        </Text>
      </TouchableOpacity>
    </View>
  );
}
