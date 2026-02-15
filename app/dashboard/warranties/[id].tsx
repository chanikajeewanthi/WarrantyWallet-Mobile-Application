import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getWarrantyById, deleteWarranty } from "../../../services/warrantyService";
import { Warranty } from "@/types/warranty";
import { getWarrantyStatus } from "../../../utils/warrantyStatus";

export default function WarrantyDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [warranty, setWarranty] = useState<Warranty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    (async () => {
      const data = await getWarrantyById(id);


      if (data?.image && !data.image.startsWith("file://")) {
        data.image = "file://" + data.image;
      }

      setWarranty(data);
      setLoading(false);
    })();
  }, [id]);

  const handleDelete = async () => {
    Alert.alert("Delete Warranty", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteWarranty(id);
            Alert.alert("Deleted", "Warranty deleted successfully");
            router.replace("/dashboard/warranties");
          } catch (err) {
            console.log(err);
            Alert.alert("Error", "Failed to delete warranty");
          }
        },
      },
    ]);
  };


  if (loading)
    return <Text className="text-center mt-12 text-gray-500">Loading...</Text>;
  if (!warranty)
    return <Text className="text-center mt-12 text-gray-500">Warranty not found</Text>;

  const status = getWarrantyStatus(warranty.expiryDate);
  const statusColors = {
    expired: "bg-red-200 text-red-700",
    expiringSoon: "bg-yellow-200 text-yellow-700",
    valid: "bg-green-200 text-green-700",
  };
  const badgeColor =
    statusColors[
    status.label === "Expired"
      ? "expired"
      : status.label === "Expiring Soon"
        ? "expiringSoon"
        : "valid"
    ];

  return (
    <ScrollView className="flex-1 bg-gray-50 px-6 pt-6">
      <Text className="text-3xl font-bold text-gray-900">{warranty.productName}</Text>


      {warranty.image ? (
        <Image
          key={warranty.image}
          source={{ uri: warranty.image }}
          className="w-full h-60 mt-4 rounded-2xl shadow-lg bg-gray-200"
          resizeMode="cover"
        />
      ) : (
        <Text className="mt-4 text-gray-400 text-center">No image available</Text>
      )}


      <View className="mt-6 bg-white rounded-2xl p-5 shadow-lg space-y-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-700 font-medium">Brand:</Text>
          <Text className="text-gray-900 font-semibold">{warranty.brand || "-"}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-700 font-medium">Seller:</Text>
          <Text className="text-gray-900 font-semibold">{warranty.seller || "-"}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-700 font-medium">Expiry Date:</Text>
          <Text className="text-gray-900 font-semibold">{warranty.expiryDate}</Text>
        </View>


        <View className={`self-start mt-2 px-3 py-1 rounded-full ${badgeColor}`}>
          <Text className="font-semibold text-sm">
            {status.label} {status.label !== "Expired" && `• ${status.daysLeft} days left`}
          </Text>
        </View>
      </View>


      <TouchableOpacity
        onPress={() => router.push(`/dashboard/warranties/edit/${id}`)}
        className="mt-6 bg-blue-600 py-4 rounded-2xl shadow-lg items-center"
      >
        <Text className="text-white font-semibold text-lg">Edit Warranty</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleDelete}
        className="mt-4 bg-red-500 py-4 rounded-2xl shadow-lg items-center"
      >
        <Text className="text-white font-semibold text-lg">Delete Warranty</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
