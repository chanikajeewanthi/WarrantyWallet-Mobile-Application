import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import { addWarranty } from "../../../services/warrantyService";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import DateTimePicker from "@react-native-community/datetimepicker";


export default function WarrantyForm() {
  const router = useRouter();
  const { user } = useAuth();

  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [seller, setSeller] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [date, setDate] = useState(new Date()); // actual date object
  const [showDatePicker, setShowDatePicker] = useState(false);

  // CAMERA STATES
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  // MEDIA PERMISSION
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  // OPEN CAMERA
  const openCamera = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert("Permission Denied", "Camera access is required");
        return;
      }
    }
    setShowCamera(true);
  };

  // TAKE PHOTO
  const takePhoto = async () => {
    if (!cameraRef.current) return;
    const result = await cameraRef.current.takePictureAsync();
    setPhoto(result.uri);
    setShowCamera(false);
  };

  // SAVE PHOTO TO GALLERY
  const savePhotoToGallery = async (uri: string): Promise<string | null> => {
    try {
      // Request permission if not granted
      if (!mediaPermission?.granted) {
        const result = await requestMediaPermission();
        if (!result.granted) {
          Alert.alert("Permission Denied", "Cannot save photo without permission");
          return null;
        }
      }

      // Save asset to gallery
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("WarrantyPhotos", asset, false);
      console.log("Photo saved to gallery:", asset.uri);

      return asset.uri; // Return the saved URI
    } catch (err) {
      console.log("Error saving photo:", err);
      return null;
    }
  };

  // HANDLE SAVE WARRANTY
  const handleSave = async () => {
    if (!productName || !expiryDate) {
      Alert.alert("Error", "Product name and expiry date required!");
      return;
    }

    let localImageUri: string | null = null;

    if (photo) {
      localImageUri = await savePhotoToGallery(photo);
    }

    try {
      await addWarranty({
        productName,
        brand,
        seller,
        expiryDate,
        image: localImageUri, // store local URI
        userId: user!.uid,
      });
      Alert.alert("Success", "Warranty Added!");
      router.replace("/dashboard/warranties");
    } catch (err) {
      console.log("Error saving warranty:", err);
      Alert.alert("Error", "Failed to save warranty");
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios"); // keep open on iOS
    if (selectedDate) {
      setDate(selectedDate);
      const formatted = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      setExpiryDate(formatted);
    }
  };

  // CAMERA VIEW
  if (showCamera) {
    return (
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back">
        <TouchableOpacity
          onPress={takePhoto}
          style={{
            position: "absolute",
            bottom: 40,
            alignSelf: "center",
            backgroundColor: "white",
            padding: 20,
            borderRadius: 50,
          }}
        />
      </CameraView>
    );
  }

  // FORM VIEW
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F8F9FF" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Add Warranty ➕</Text>

      <TextInput
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
        style={{ marginTop: 20, backgroundColor: "white", padding: 15, borderRadius: 15 }}
      />

      <TextInput
        placeholder="Brand"
        value={brand}
        onChangeText={setBrand}
        style={{ marginTop: 15, backgroundColor: "white", padding: 15, borderRadius: 15 }}
      />

      <TextInput
        placeholder="Seller"
        value={seller}
        onChangeText={setSeller}
        style={{ marginTop: 15, backgroundColor: "white", padding: 15, borderRadius: 15 }}
      />

      {/* <TextInput
        placeholder="Expiry Date (YYYY-MM-DD)"
        value={expiryDate}
        onChangeText={setExpiryDate}
        style={{ marginTop: 15, backgroundColor: "white", padding: 15, borderRadius: 15 }}
      /> */}

      {/* Expiry Date Picker */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={{
          marginTop: 15,
          backgroundColor: "white",
          padding: 15,
          borderRadius: 15,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: expiryDate ? "black" : "#888" }}>
          {expiryDate || "Select Expiry Date"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date()} // optional: prevent past dates
        />
      )}

      {/* Camera Button */}
      <TouchableOpacity
        onPress={openCamera}
        style={{ marginTop: 20, backgroundColor: "#3B82F6", padding: 16, borderRadius: 16, alignItems: "center" }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>📷 Add Product Photo</Text>
      </TouchableOpacity>

      {/* Image Preview */}
      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: "100%", height: 200, borderRadius: 16, marginTop: 15 }}
        />
      )}

      <TouchableOpacity
        onPress={handleSave}
        style={{ marginTop: 25, backgroundColor: "#22C55E", padding: 18, borderRadius: 18, alignItems: "center" }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Save Warranty</Text>
      </TouchableOpacity>
    </View>
  );
}
