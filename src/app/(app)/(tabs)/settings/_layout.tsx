import { Stack } from "expo-router";
import React from "react";

import { BackButton } from "../../../../components/back-button";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "マイページ",
          headerTransparent: true,
        }}
      />

      <Stack.Screen
        name="nickname"
        options={{
          headerTitle: "マイページ",
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
