import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import ChatListElement from "@/components/ChatListElement";
import AppHeader from "@/components/AppHeader";

import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// import { chatList } from "@/mock_data";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/utils/supabase";

export default function HomeScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [chats, setChats] = useState<any[] | null>(null);

  useEffect(() => {
    getChats();
  }, []);

  async function getChats() {
    const { data: chats, error } = await supabase
      .from("ChatUser")
      .select("chat_id")
      .eq("user_id", user?.id);

    if (error) {
      Alert.alert("Something went wrong...");
      return console.log(error.message);
    }

    const chatIDs = chats.map((chat) => chat.chat_id);

    const { data: chatsData, error: chatsError } = await supabase
      .from("ChatUser")
      .select("chat_id, User:user_id(id, username, email)")
      .in("chat_id", chatIDs)
      .neq("user_id", user?.id);

    if (chatsError) {
      Alert.alert("Something went wrong...");
      return console.log(chatsError.message);
    }
    setChats(chatsData);
  }

  return (
    <SafeAreaView className="m-4 flex flex-1">
      <AppHeader username={user ? user.username : "whoever u are"} />
      <FlatList
        data={chats}
        keyExtractor={(chat) => chat.chat_id}
        renderItem={({ item }) => (
          <ChatListElement
            chat_id={item.chat_id}
            name={item.User.username}
            lastMessage={"Hey"}
          />
        )}
      />
      {/* <FlatList
          data={chatList}
          keyExtractor={(chat) => chat.id}
          renderItem={({ item }) => (
            <ChatListElement
              id={item.id}
              name={item.name}
              lastMessage={item.lastMessage}
            />
          )}
        /> */}
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.push("/auth")}>
          <MaterialCommunityIcons name="door" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center self-center"
          onPressIn={() => router.push("/invites")}
        >
          <AntDesign name="plus" size={52} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPressIn={signOut}>
          <MaterialCommunityIcons
            name="account-outline"
            size={40}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
