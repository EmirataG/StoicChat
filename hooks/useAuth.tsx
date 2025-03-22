import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { Alert } from "react-native";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  loading: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  async function getUser(id: string) {
    const { data, error } = await supabase
      .from("User")
      .select("*")
      .eq("id", id)
      .single();
    if (error) Alert.alert(error.message);
    else {
      router.replace("/");
      setUser(data);
    }
  }

  async function signIn(email: string, password: string) {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    } else {
      getUser(data.user.id);
    }
    setLoading(false);
  }

  async function signUp(email: string, username: string, password: string) {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }
    // if (!session)
    //   Alert.alert("Please check your inbox for email verification!");

    const { error: userError } = await supabase.from("User").insert([
      {
        id: data.user?.id,
        email: email,
        username: username,
      },
    ]);

    if (userError) {
      Alert.alert(userError.message);
    } else if (data.user) {
      getUser(data.user.id);
      router.replace("/");
    }
    setLoading(false);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
    router.replace("/auth");
  }

  useEffect(() => {
    const { data: authData } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) return;
        getUser(session.user.id);
      }
    );
    return () => {
      authData.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
