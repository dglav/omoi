import { format } from "@formkit/tempo";
import { Stack } from "expo-router";
import React from "react";

import { BackButton } from "../../../components/back-button";

export default function Layout() {
  const date = format(new Date(), "YYYY/MM/DD");

  return (
    <Stack>
      <Stack.Screen
        name="condition"
        options={{
          headerTitle: date,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="feelings"
        options={{
          headerTitle: date,
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="tags"
        options={{
          headerTitle: date,
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="note"
        options={{
          headerTitle: date,
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
