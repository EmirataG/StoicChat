import { useAuth } from "@/hooks/useAuth";
import { View, Text } from "react-native";

export default function ChatMessage(props: {
  sender_id: string;
  text: string;
}) {
  const { user } = useAuth();
  const styles =
    props.sender_id == user?.id ? "items-end mb-4" : "items-start mb-4";
  return (
    <View className={styles}>
      <Text className="text-wrap max-w-72 text-lg">{props.text}</Text>
    </View>
  );
}
