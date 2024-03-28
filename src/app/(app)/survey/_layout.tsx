import { Stack } from "expo-router";
import React from "react";

import { BackButton } from "../../../components/back-button";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="relationship-length"
        options={{
          headerTitle: "基本情報の登録",
          headerTransparent: true,
        }}
      />

      <Stack.Screen
        name="relationship-status"
        options={{
          headerTitle: "基本情報の登録",
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />

      <Stack.Screen
        name="conversation-amount"
        options={{
          headerTitle: "基本情報の登録",
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />

      <Stack.Screen
        name="conversation-obstacle"
        options={{
          headerTitle: "基本情報の登録",
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />

      <Stack.Screen
        name="self-expression"
        options={{
          headerTitle: "基本情報の登録",
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />

      <Stack.Screen
        name="partner-expression"
        options={{
          headerTitle: "基本情報の登録",
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
