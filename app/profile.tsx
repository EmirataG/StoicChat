import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";

import { useState } from "react";

export default function ProfileScreen() {
  const { user } = useAuth();
  const [enteredUsername, setEnteredUsername] = useState(user?.username);
  const [enteredEmail, setEnteredEmail] = useState(user?.email);

  return (
    <SafeAreaView className="flex-1 justify-center items-center gap-4">
      <Text className="text-2xl font-semibold mb-4">Profile </Text>
      <View className="gap-2">
        <Text>Edit username:</Text>
        <TextInput
          className="p-2 pt-0 border-b-2 w-72 text-lg"
          value={enteredUsername}
          onChangeText={setEnteredUsername}
        />
      </View>
      <View className="gap-2">
        <Text>Edit email:</Text>
        <TextInput
          className="p-2 pt-0 border-b-2 w-72 text-lg"
          value={enteredEmail}
          onChangeText={setEnteredEmail}
        />
      </View>
      <TouchableOpacity
        className="w-fit p-2 rounded-md my-6 border-2"
        activeOpacity={0.5}
      >
        <Text className="text-center text-xl">Save changes</Text>
      </TouchableOpacity>
      <Text className="text-2xl font-semibold mb-4 mt-6">Preferences</Text>
      <View className="flex-row gap-8 items-center">
        <Text className="w-40">Notifications</Text>
        <Switch onValueChange={() => console.log("notifications changed")} />
      </View>
      <View className="flex-row gap-8 items-center">
        <Text className="w-40">Dark Mode</Text>
        <Switch onValueChange={() => console.log("mode changed")} />
      </View>
      <View className="flex-row gap-8 items-center">
        <Text className="w-40">Allow all users to add you to groups</Text>
        <Switch onValueChange={() => console.log("access changed")} />
      </View>
    </SafeAreaView>
  );
}
