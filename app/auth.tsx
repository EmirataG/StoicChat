import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";

export default function SignIn() {
  const { signIn, signUp, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-3xl font-semibold absolute top-1/4">
        The Stoic Chat
      </Text>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          className="text-lg border-b-2 p-2 h-14 w-72"
          placeholder="marcus.aurelius@stoicmail.com"
          placeholderTextColor="grey"
          value={email}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        {isSignUp ? (
          <TextInput
            className="text-lg border-b-2 p-2 h-14 w-72"
            placeholder="Marcus Aurelius"
            placeholderTextColor="grey"
            value={username}
            autoCapitalize="none"
            onChangeText={(text) => setUsername(text)}
          />
        ) : null}
        <TextInput
          className="text-lg border-b-2 p-2 h-14 w-72"
          placeholder="password"
          placeholderTextColor="grey"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TouchableOpacity
          className="w-fit p-2 rounded-md my-6 border-2"
          activeOpacity={0.5}
          onPress={() =>
            isSignUp
              ? signUp(email, username, password)
              : signIn(email, password)
          }
        >
          <Text className="text-center text-xl">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="self-center"
          disabled={loading}
          onPress={() => setIsSignUp((prevIsSignUp) => !prevIsSignUp)}
        >
          <Text>
            {isSignUp
              ? "Not new here? Sign in then."
              : "New here? Sign up then."}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
