import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "チュートリアル",
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}