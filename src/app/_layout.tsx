import { Stack, useRouter } from "expo-router";
import React, { StrictMode, useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { theme } from "../theme";

export default function Layout() {
  const router = useRouter();

  /**
   * Replace with implementation async storage for introduction screen
   * https://docs.expo.dev/versions/latest/sdk/async-storage/
   */
  useEffect(() => {
    router.navigate("/introduction");
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
