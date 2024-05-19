import { Stack } from "expo-router";
import React from "react";

import { BackButton } from "../../../../components/back-button";
import { useAppTheme } from "../../../../hooks/useAppTheme";

export default function Layout() {
  const theme = useAppTheme();

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
          headerTitle: "ニックネーム",
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />

      {/* <Stack.Screen
        name="pair-settings"
        options={{
          headerTitle: "ペアリング設定",
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      /> */}

      <Stack.Screen
        name="color"
        options={{
          headerTitle: "カラーテーマ",
          // headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerShadowVisible: false,
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
