import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  return (
    <ScrollView className="flex-1 bg-[#F6F7FB] px-6 pt-16">


      <Text className="text-4xl font-extrabold text-gray-900 text-center">
        My Dashboard
      </Text>

      <Text className="text-center text-gray-500 mt-2">
        Manage all warranties easily
      </Text>


      <Link href="/dashboard/warranties" asChild>
        <TouchableOpacity
          activeOpacity={0.9}
          className="
          mt-14
          bg-white
          rounded-[32px]
          p-7
          shadow-2xl
          border border-gray-100
          "
        >
          <View className="flex-row justify-between items-center">

            <View>
              <Text className="text-2xl font-bold text-gray-900">
                📦 My Warranties
              </Text>

              <Text className="text-gray-400 mt-1 text-base">
                View, edit and organize products
              </Text>
            </View>

            <View className="
              bg-purple-100
              px-5 py-3
              rounded-2xl
            ">
              <Text className="text-purple-600 text-xl font-bold">→</Text>
            </View>

          </View>
        </TouchableOpacity>
      </Link>


      <Link href="/dashboard/warranties/form" asChild>
        <TouchableOpacity
          activeOpacity={0.9}
          className="
          mt-6
          bg-white
          rounded-[32px]
          p-7
          shadow-2xl
          border border-gray-100
          "
        >
          <View className="flex-row justify-between items-center">

            <View>
              <Text className="text-2xl font-bold text-gray-900">
                ✨ Add Warranty
              </Text>

              <Text className="text-gray-400 mt-1 text-base">
                Save a new purchase warranty
              </Text>
            </View>

            <View className="
              bg-pink-100
              px-5 py-3
              rounded-2xl
            ">
              <Text className="text-pink-600 text-xl font-bold">＋</Text>
            </View>

          </View>
        </TouchableOpacity>
      </Link>


      <TouchableOpacity
        onPress={handleLogout}
        activeOpacity={0.85}
        className="
        mt-20
        rounded-[30px]
        py-5
        items-center
        shadow-xl
        "
        style={{
          backgroundColor: "#111827"
        }}
      >
        <Text className="text-white text-xl font-semibold tracking-wide">
          Logout
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
