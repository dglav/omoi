import { Stack } from "expo-router";
import React from "react";

import { BackButton } from "../../../../components/back-button";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="name"
        options={{
          headerTitle: "編集",
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />

      <Stack.Screen
        name="feeling-level"
        options={{
          headerTitle: "編集",
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
