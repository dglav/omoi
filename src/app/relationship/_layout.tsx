import { Stack } from "expo-router";
import React from "react";

import { BackButton } from "../../components/back-button";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="length"
        options={{
          headerTitle: "基本情報の登録",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="status"
        options={{
          headerTitle: "基本情報の登録",
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
