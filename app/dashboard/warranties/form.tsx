import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import { useRouter } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import { addWarranty } from "../../../services/warrantyService";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from 'expo-linear-gradient';

export default function WarrantyForm() {
  const router = useRouter();
  const { user } = useAuth();

  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [seller, setSeller] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

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

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    const result = await cameraRef.current.takePictureAsync();
    setPhoto(result.uri);
    setShowCamera(false);
  };

  const savePhotoToGallery = async (uri: string): Promise<string | null> => {
    try {
      if (!mediaPermission?.granted) {
        const result = await requestMediaPermission();
        if (!result.granted) {
          Alert.alert("Permission Denied", "Cannot save photo without permission");
          return null;
        }
      }
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("WarrantyPhotos", asset, false);
      return asset.uri;

    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const handleSave = async () => {
    if (!productName || !expiryDate) {
      Alert.alert("Error", "Product name and expiry date required!");
      return;
    }

    let localImageUri: string | null = null;
    if (photo) localImageUri = await savePhotoToGallery(photo);

    try {
      await addWarranty({
        productName,
        brand,
        seller,
        expiryDate,
        image: localImageUri,
        userId: user!.uid,
      });
      Alert.alert("Success", "Warranty Added!");
      router.replace("/dashboard/warranties");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to save warranty");
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
      setExpiryDate(selectedDate.toISOString().split("T")[0]);
    }
  };

  if (showCamera) {
    return (
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back">
        <TouchableOpacity
          onPress={takePhoto}
          className="absolute bottom-12 self-center bg-white p-5 rounded-full shadow-2xl"
        />
      </CameraView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 70 }}
        className="flex-1 px-5 pt-12"
      >

        <Text className="text-3xl font-bold text-gray-900 text-center">
          Add Warranty
        </Text>
        <Text className="text-center text-gray-400 mt-1 mb-10 text-sm">
          Store product warranty safely
        </Text>

        <View style={{ gap: 16 }}>


          {[
            { label: "Product Name", value: productName, set: setProductName, placeholder: "Enter product name" },
            { label: "Brand", value: brand, set: setBrand, placeholder: "Enter brand" },
            { label: "Seller", value: seller, set: setSeller, placeholder: "Enter seller" },
          ].map((field, idx) => (
            <LinearGradient
              key={idx}
              colors={["#F9D6FA", "#E0C3FC"]}
              start={[0, 0]}
              end={[1, 1]}
              style={{
                borderRadius: 26,
                padding: 18,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 18,
                shadowOffset: { width: 0, height: 8 },
                elevation: 6,
              }}
            >
              <Text className="text-gray-700 mb-2 text-xs font-semibold">
                {field.label}
              </Text>

              <TextInput
                placeholder={field.placeholder}
                value={field.value}
                onChangeText={field.set}
                className="
                bg-white
                rounded-2xl
                px-4
                py-3
                text-gray-900
                text-[15px]
              "
              />
            </LinearGradient>
          ))}


          <LinearGradient
            colors={["#FAD0C4", "#FFD1FF"]}
            start={[0, 0]}
            end={[1, 1]}
            style={{
              borderRadius: 26,
              padding: 18,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 18,
              shadowOffset: { width: 0, height: 8 },
              elevation: 6,
            }}
          >
            <TouchableOpacity onPress={() => setShowDatePicker(true)} activeOpacity={0.85}>
              <Text className="text-gray-700 mb-2 text-xs font-semibold">Expiry Date</Text>
              <Text className={expiryDate ? "text-gray-900 text-[15px]" : "text-gray-400 text-[15px]"}>
                {expiryDate || "Select expiry date"}
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
              minimumDate={new Date()}
            />
          )}


          <LinearGradient
            colors={["#C1F0F6", "#B9B0FF"]}
            start={[0, 0]}
            end={[1, 1]}
            style={{
              borderRadius: 30,
              paddingVertical: 22,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 18,
              shadowOffset: { width: 0, height: 8 },
              elevation: 6,
            }}
          >
            <TouchableOpacity onPress={openCamera} activeOpacity={0.9}>
              <Text className="text-xl">📸</Text>
              <Text className="text-base font-semibold text-gray-800 mt-2">Add Product Photo</Text>
              <Text className="text-gray-400 text-xs mt-1">Tap to open camera</Text>
            </TouchableOpacity>
          </LinearGradient>


          {photo && (
            <Image
              source={{ uri: photo }}
              style={{
                width: "100%",
                height: 230,
                borderRadius: 26,
                marginTop: 6,
              }}
              resizeMode="cover"
            />
          )}


          <LinearGradient
            colors={["#8B5CF6", "#EC4899"]}
            start={[0, 0]}
            end={[1, 1]}
            style={{
              marginTop: 12,
              borderRadius: 30,
              paddingVertical: 16,
              alignItems: "center",
              shadowColor: "#EC4899",
              shadowOpacity: 0.35,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 8 },
              elevation: 10,
            }}
          >
            <TouchableOpacity onPress={handleSave} activeOpacity={0.9}>
              <Text className="text-white text-lg font-semibold tracking-wide">
                Save Warranty
              </Text>
            </TouchableOpacity>
          </LinearGradient>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );


}
