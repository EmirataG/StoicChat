import { View, Text } from "react-native";

export default function AppHeader(props: { username: string }) {
  return (
    <View className="p-6 gap-1">
      <Text className="text-center text-2xl font-semibold">{`Remember to stay stoic, ${props.username}`}</Text>
      <Text className="text-center">
        "The soul becomes dyed with the color of its thoughts."
      </Text>
    </View>
  );
}
