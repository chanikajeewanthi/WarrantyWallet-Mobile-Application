import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getWarrantyById, updateWarranty } from "../../../../services/warrantyService";

export default function EditWarranty() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);


  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [seller, setSeller] = useState("");
  const [expiryDate, setExpiryDate] = useState("");


  useEffect(() => {
    if (!id) return;

    const loadWarranty = async () => {
      const data = await getWarrantyById(id);

      if (!data) {
        Alert.alert("Error", "Warranty not found");
        router.back();
        return;
      }

      //  PREFILL FORM
      setProductName(data.productName);
      setBrand(data.brand);
      setSeller(data.seller);
      setExpiryDate(data.expiryDate);

      setLoading(false);
    };

    loadWarranty();
  }, [id]);

  //  Save updates
  const handleUpdate = async () => {
    if (!expiryDate || !productName) {
      Alert.alert("Error", "Product name and expiry date required");
      return;
    }

    await updateWarranty(id!, {
      productName,
      brand,
      seller,
      expiryDate,
    });

    Alert.alert("Updated", "Warranty updated successfully");
    router.replace("/dashboard/warranties");
  };

  if (loading) return null;

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F8F9FF" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Edit Warranty ✏️
      </Text>

      <TextInput
        value={productName}
        onChangeText={setProductName}
        placeholder="Product Name"
        style={inputStyle}
      />

      <TextInput
        value={brand}
        onChangeText={setBrand}
        placeholder="Brand"
        style={inputStyle}
      />

      <TextInput
        value={seller}
        onChangeText={setSeller}
        placeholder="Seller"
        style={inputStyle}
      />

      <TextInput
        value={expiryDate}
        onChangeText={setExpiryDate}
        placeholder="Expiry Date (YYYY-MM-DD)"
        style={inputStyle}
      />

      <TouchableOpacity
        onPress={handleUpdate}
        style={{
          marginTop: 25,
          backgroundColor: "#3B82F6",
          padding: 18,
          borderRadius: 18,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          Update Warranty
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const inputStyle = {
  marginTop: 15,
  backgroundColor: "white",
  padding: 15,
  borderRadius: 15,
};
