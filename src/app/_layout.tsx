import { Stack } from "expo-router";
import { StrictMode } from "react";
import { PaperProvider } from "react-native-paper";

import { theme } from "../theme";

export default function Layout() {
  return (
    <StrictMode>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="mood-share"
            options={{
              headerTransparent: true,
              headerTitle: "Mood Share",
              headerTitleAlign: "center",
              headerBackTitle: "Back",
              headerBackTitleVisible: true,
            }}
          />
        </Stack>
      </PaperProvider>
    </StrictMode>
  );
}
