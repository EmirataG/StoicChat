import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ChatListElement(props: {
  chat_id: string;
  name: string;
  lastMessage: string;
}) {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        router.push({
          pathname: "/chat/[id]",
          params: { id: props.chat_id, name: props.name },
        })
      }
    >
      <View className="border-b p-4 flex flex-row items-baseline justify-between">
        <Text className="text-xl">{props.name}</Text>
        <Text>
          {props.lastMessage.length > 30
            ? props.lastMessage.substring(0, 30) + " ..."
            : props.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
