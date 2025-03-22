import { View, Text } from "react-native";

export default function RequestsFallback() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <View
          key={index}
          className="flex-row p-4 border-b justify-between items-end"
        >
          <Text className="text-lg text-transparent bg-gray-300">
            This is not visible
          </Text>
          <Text className="bg-gray-300 text-transparent">And this too</Text>
        </View>
      ))}
    </>
  );
}
