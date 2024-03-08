import { Stack, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { StrictMode } from "react";
import { Pressable } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { theme } from "../theme";

export default function Layout() {
  const router = useRouter();

  return (
    <StrictMode>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="onboarding"
              options={{
                headerTitle: "Omoi β版",
                headerTransparent: true,
                headerLeft: () => (
                  <Pressable onPress={() => router.back()}>
                    <ChevronLeft color={theme.colors.text} />
                  </Pressable>
                ),
              }}
            />
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
