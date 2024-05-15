import { Stack } from "expo-router";
import React from "react";

import { BackButton } from "../../../components/back-button";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="[postGroupId]/chat"
        options={{
          headerTitle: "投稿コメント",
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
