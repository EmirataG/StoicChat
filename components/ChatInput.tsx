import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "@/utils/supabase";

export default function ChatInput({
  chat_id,
  sender_id,
}: {
  chat_id: string;
  sender_id: string;
}) {
  const [message, setMessage] = useState<string>("");

  async function handleSendMessage() {
    if (!message.trim()) return;
    const { error } = await supabase.from("Message").insert({
      content: message.trim(),
      sender_id: sender_id,
      chat_id: chat_id,
    });
    setMessage("");

    if (error) {
      Alert.alert("Something went wrong...");
      return console.log(error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 justify-end mb-6 mx-4"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex flex-row gap-4 items-center">
        <View className="flex-1 pb-4">
          <TextInput
            value={message}
            onChangeText={setMessage}
            className="text-lg border-b-2 p-2"
            placeholder="Type message here ..."
          />
        </View>
        <TouchableOpacity onPress={handleSendMessage}>
          <Ionicons name="chevron-forward-sharp" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
