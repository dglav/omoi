import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Stack, useRouter } from "expo-router";
import React, { StrictMode, useEffect, useState } from "react";
import { AppState } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Database, Tables } from "../../types/supabase";
import { HAS_VIEWED_INTRODUCTION } from "../asyncStorageConstants";
import { theme } from "../theme";
import { BackButton } from "../components/back-button";

export const supabase = createClient<Database>(
  "https://osfzwvhubwmiwimpgrpj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZnp3dmh1YndtaXdpbXBncnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5MjQ2MDgsImV4cCI6MjAyNjUwMDYwOH0.XDSsknfDRqeSbZO26ynvE6Ea3RiUQaN5yqsVWdFF9aI",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Layout() {
  const router = useRouter();
  const [countries, setCountries] = useState<Tables<"countries">[]>([]);

  console.log({ countries });

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data ?? []);
  }

  useEffect(() => {
    const rerouteIfFirstLoad = async () => {
      try {
        const value = await AsyncStorage.getItem(HAS_VIEWED_INTRODUCTION);
        if (value !== "true") {
          router.navigate("/introduction");
        }
      } catch (e) {
        console.error("getting from async store failed", e);
      }
    };

    rerouteIfFirstLoad();
  }, []);

  return (
    <StrictMode>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="signIn"
              options={{
                headerTitle: "ログイン",
                headerTransparent: true,
                headerLeft: () => <BackButton />,
              }}
            />
            <Stack.Screen
              name="introduction"
              options={{
                headerTitle: "Omoi β版",
                headerTransparent: true,
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="survey"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="new-journal-entry"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="tutorial" options={{ headerShown: false }} />
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, headerBackTitle: "Back" }}
            />
            <Stack.Screen
              name="mood-share"
              options={{
                headerTitle: "Mood Share",
                headerBackTitle: "Back",
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="modal"
              options={{
                presentation: "modal",
              }}
            />
          </Stack>
        </PaperProvider>
      </SafeAreaProvider>
    </StrictMode>
  );
}
