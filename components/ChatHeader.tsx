import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function ChatHeader(props: { name: string }) {
  const router = useRouter();
  return (
    <View className="m-4 p-2 border-b-2 flex flex-row items-center justify-between">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-sharp" size={32} color="black" />
      </TouchableOpacity>
      <Text className="text-xl font-semibold">{props.name}</Text>
    </View>
  );
}
