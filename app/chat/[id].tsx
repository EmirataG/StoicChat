import { FlatList, SafeAreaView, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMassage";
import ChatInput from "@/components/ChatInput";

import { supabase } from "@/utils/supabase";
import { useAuth } from "@/hooks/useAuth";

import { MessageType } from "@/constants/Types";

export default function Chat() {
  const { id, name }: { id: string; name: string } = useLocalSearchParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<MessageType[] | null>(null);

  useEffect(() => {
    let isMounted = true;
    let subscription: ReturnType<typeof supabase.channel> | null;

    const fetchMessagesAndSubscribe = async () => {
      // Fetch initial messages
      const { data, error } = await supabase
        .from("Message")
        .select("*")
        .eq("chat_id", id);

      if (error) {
        Alert.alert("Something went wrong...");
        return console.log(error.message);
      }

      if (isMounted) setMessages(data as MessageType[]);

      // Set up real-time subscription
      subscription = supabase
        .channel("chat_messages")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "Message",
            filter: `chat_id=eq.${id}`,
          },
          (payload) => {
            setMessages((prev) => [
              ...(prev || []),
              payload.new as MessageType,
            ]);
          }
        )
        .subscribe();
    };

    fetchMessagesAndSubscribe();

    return () => {
      isMounted = false;
      if (subscription) supabase.removeChannel(subscription);
    };
  }, [id]);

  async function getMessages() {
    const { data, error } = await supabase
      .from("Message")
      .select("*")
      .eq("chat_id", id);

    if (error) {
      Alert.alert("Something went wrong...");
      return console.log(error.message);
    }

    setMessages(data);
  }

  return (
    <SafeAreaView className="m-2 flex-1">
      {name ? <ChatHeader name={name} /> : null}
      <FlatList
        className="p-4"
        data={messages}
        keyExtractor={(message) => message.id}
        renderItem={({ item }) => (
          <ChatMessage sender_id={item!.sender_id} text={item.content} />
        )}
      />
      <ChatInput chat_id={id} sender_id={user!.id} />
    </SafeAreaView>
  );
}
