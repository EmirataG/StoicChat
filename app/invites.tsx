import { View, Text, SafeAreaView, FlatList, Alert } from "react-native";
import { useState, useEffect, Suspense } from "react";

import InviteForm from "@/components/InviteForm";
import RequestGot from "@/components/RequestGot";
import RequestsFallback from "@/components/fallbacks/RequestsFallback";

import { supabase } from "@/utils/supabase";
import { useAuth } from "@/hooks/useAuth";

export default function InvitesScreen() {
  const { user } = useAuth();
  const [invitesGot, seInvitesGot] = useState<any[] | null>(null);
  const [invitesSent, setInvitesSent] = useState<any[] | null>(null);

  useEffect(() => {
    getInvites();
  }, []);

  async function getInvites() {
    const { data: invitesGot } = await supabase
      .from("Request")
      .select("*, User:sender_id(id, username, email)")
      .eq("recipient_id", user?.id);

    const { data: invitesSent } = await supabase
      .from("Request")
      .select("*, User:recipient_id(id, username, email)")
      .eq("sender_id", user?.id);

    seInvitesGot(invitesGot);
    setInvitesSent(invitesSent);
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="p-8">
        <InviteForm />
        <Text className="m-4 mt-6 mb-2 text-xl font-semibold text-center">
          Invites Sent to You
        </Text>
        <View className="h-2/3">
          <Suspense fallback={<RequestsFallback />}>
            <FlatList
              className="h-1/2"
              data={invitesGot}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => <RequestGot item={item} />}
            />
          </Suspense>
          <Text className="m-4 mt-6 mb-2 text-xl font-semibold text-center">
            Invites Sent by You
          </Text>
          <Suspense fallback={<RequestsFallback />}>
            <FlatList
              className="h-1/2"
              data={invitesSent}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => <RequestGot item={item} />}
            />
          </Suspense>
        </View>
      </View>
    </SafeAreaView>
  );
}
