import { Stack } from "expo-router";
import React from "react";

import { BackButton } from "../../../components/back-button";

export default function Layout() {
  return (
    <Stack screenOptions={{ animation: "simple_push" }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "編集",
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
