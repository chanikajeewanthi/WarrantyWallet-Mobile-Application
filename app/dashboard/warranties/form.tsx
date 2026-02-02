import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import { addWarranty } from "../../../services/warrantyService";

export default function WarrantyForm() {
  const router = useRouter();
  const { user } = useAuth();

  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [seller, setSeller] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSave = async () => {
    if (!productName || !expiryDate) {
      Alert.alert("Error", "Product name and expiry date required!");
      return;
    }

    await addWarranty({
      productName,
      brand,
      seller,
      expiryDate,
      userId: user!.uid,
    });

    Alert.alert("Success", "Warranty Added!");
    router.replace("/dashboard/warranties" as any);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F8F9FF" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Add Warranty ➕
      </Text>

      <TextInput
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
        style={{
          marginTop: 20,
          backgroundColor: "white",
          padding: 15,
          borderRadius: 15,
        }}
      />

      <TextInput
        placeholder="Brand"
        value={brand}
        onChangeText={setBrand}
        style={{
          marginTop: 15,
          backgroundColor: "white",
          padding: 15,
          borderRadius: 15,
        }}
      />

      <TextInput
        placeholder="Seller"
        value={seller}
        onChangeText={setSeller}
        style={{
          marginTop: 15,
          backgroundColor: "white",
          padding: 15,
          borderRadius: 15,
        }}
      />

      <TextInput
        placeholder="Expiry Date (YYYY-MM-DD)"
        value={expiryDate}
        onChangeText={setExpiryDate}
        style={{
          marginTop: 15,
          backgroundColor: "white",
          padding: 15,
          borderRadius: 15,
        }}
      />

      <TouchableOpacity
        onPress={handleSave}
        style={{
          marginTop: 25,
          backgroundColor: "#22C55E",
          padding: 18,
          borderRadius: 18,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          Save Warranty
        </Text>
      </TouchableOpacity>
    </View>
  );
}
