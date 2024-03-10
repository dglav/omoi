import { format } from "@formkit/tempo";
import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="condition"
        options={{
          headerTitle: format(new Date(), "YYYY/MM/DD"),
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}
