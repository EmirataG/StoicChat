import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/utils/supabase";

export default function InviteForm() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");

  async function sendRequest() {
    const { data } = await supabase
      .from("User")
      .select("*")
      .eq("email", email)
      .single();

    if (!data) return Alert.alert(`No user with email ${email}`);

    const { error } = await supabase.from("Request").insert([
      {
        sender_id: user?.id,
        recipient_id: data.id,
      },
    ]);

    if (error) {
      Alert.alert(error.message);
    }
    Alert.alert(`Invite sent to ${email}`);
    setEmail("");
  }

  return (
    <View>
      <Text className="mb-8 text-2xl font-semibold text-center">
        Send an Invite
      </Text>
      <View className="flex-row items-center gap-4">
        <View>
          <Text>Invite by email:</Text>
          <TextInput
            className="text-lg border-b-2 p-2 h-14 w-72"
            value={email}
            onChangeText={setEmail}
            placeholder="marcus.aurelius@stoicmail.com"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity onPress={sendRequest}>
          <AntDesign name="plus" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
