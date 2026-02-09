import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getWarrantyById, deleteWarranty } from "../../../services/warrantyService";
import { Warranty } from "@/types/warranty";
import { Image } from "react-native";


export default function WarrantyDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [warranty, setWarranty] = useState<Warranty | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!id) return;

    const loadWarranty = async () => {
      const data = await getWarrantyById(id);
      setWarranty(data);
      setLoading(false);
    };

    loadWarranty();
  }, [id]);

  // const handleDelete = async () => {
  //   await deleteWarranty(id as string);
  //   Alert.alert("Deleted", "Warranty removed!");
  //   router.replace("/dashboard/warranties" as any);
  // };

  // if (!warranty) return null;

  const handleDelete = async () => {
    Alert.alert(
      "Delete Warranty",
      "Are you sure you want to delete this warranty?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteWarranty(id);
            router.replace("/dashboard/warranties");
          },
        },
      ]
    );
  };

  if (loading) return <Text>Loading...</Text>;
  if (!warranty) return <Text>Warranty not found</Text>;

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F8F9FF" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {warranty.productName}
      </Text>

      {warranty.image && (
        <Image
          source={{ uri: warranty.image }}
          style={{
            width: "100%",
            height: 220,
            borderRadius: 16,
            marginTop: 15,
          }}
          resizeMode="cover"
        />
      )}

      <Text style={{ marginTop: 10 }}>Brand: {warranty.brand}</Text>
      <Text>Seller: {warranty.seller}</Text>
      <Text>Expiry Date: {warranty.expiryDate}</Text>

      <TouchableOpacity
        onPress={() =>
          router.push(`/dashboard/warranties/edit/${id}`)
        }
        style={{
          marginTop: 20,
          backgroundColor: "#3B82F6",
          padding: 18,
          borderRadius: 18,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          Edit Warranty
        </Text>
      </TouchableOpacity>


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
