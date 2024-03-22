import { Redirect, Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

import { useSession } from "../../providers/SessionProvider";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/signIn" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="survey"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="tutorial" options={{ headerShown: false }} />

      <Stack.Screen name="new-journal-entry" options={{ headerShown: false }} />

      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, headerBackTitle: "Back" }}
      />
    </Stack>
  );
}
