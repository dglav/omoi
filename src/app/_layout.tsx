import { Stack, useRouter } from "expo-router";
import React, { StrictMode } from "react";
import { Button, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { theme } from "../theme";

export default function Layout() {
  const router = useRouter();

  return (
    <StrictMode>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{ headerTitle: "Login", headerShown: false }}
            />
            <Stack.Screen
              name="register"
              options={{
                headerTitle: "Create Account",
                headerTransparent: true,
                headerRight: () => (
                  <Button onPress={() => router.push("/modal")}>Open</Button>
                ),
                headerBackTitle: "Back",
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, headerBackTitle: "Back" }}
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
