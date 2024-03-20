import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Stack, useRouter } from "expo-router";
import React, { StrictMode, useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Database, Tables } from "../../types/supabase";
import { HAS_VIEWED_INTRODUCTION } from "../asyncStorageConstants";
import { theme } from "../theme";

const supabase = createClient<Database>(
  "https://osfzwvhubwmiwimpgrpj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZnp3dmh1YndtaXdpbXBncnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5MjQ2MDgsImV4cCI6MjAyNjUwMDYwOH0.XDSsknfDRqeSbZO26ynvE6Ea3RiUQaN5yqsVWdFF9aI",
);

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
