import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";

import { supabase } from "@/utils/supabase";
import { useAuth } from "@/hooks/useAuth";

export default function RequestGot({ item }: { item: any }) {
  const [lastTap, setLastTap] = useState<number | null>(null);
  const { user } = useAuth();

  function handleDoubleTap() {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      Alert.alert("Accepted");
      handleAccept();
    } else {
      setLastTap(now);
    }
  }

  async function handleAccept() {
    const { data: createdChat, error: chatCreatiionError } = await supabase
      .from("Chat")
      .insert({})
      .select()
      .single();
    if (chatCreatiionError) return Alert.alert(chatCreatiionError.message);

    const { data, error } = await supabase
      .from("ChatUser")
      .insert([
        {
          user_id: user?.id,
          chat_id: createdChat.id,
        },
        {
          user_id: item.User.id,
          chat_id: createdChat.id,
        },
      ])
      .select();

    console.log(data);
    if (error) return Alert.alert(error.message);
  }

  async function handleDelete() {
    const { error } = await supabase.from("Request").delete().eq("id", item.id);
    if (error) return Alert.alert("Something went wrong...");
    Alert.alert("Request deleted");
  }

  return (
    <TouchableOpacity onPress={handleDoubleTap} onLongPress={handleDelete}>
      <View className="flex-row p-4 border-b justify-between items-baseline">
        <Text className="text-lg">{item.User.username}</Text>
        <Text>{item.created_at.substring(0, 10)}</Text>
      </View>
    </TouchableOpacity>
  );
}
