import { Redirect, Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

import { useAppTheme } from "../../hooks/useAppTheme";
import { useNotifications } from "../../hooks/useNotifications";
import { useSession } from "../../providers/AuthProvider";
import { useStore as usePostStore } from "../../screens/posts/store/useStore";

export default function AppLayout() {
  useNotifications();
  const theme = useAppTheme();
  const { session, isLoading } = useSession();
  const { resetAll } = usePostStore();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="survey"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="tutorial" options={{ headerShown: false }} />

      <Stack.Screen
        name="setup"
        options={{
          headerTitle: "カラーテーマ",
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="posts/new"
        options={{ headerShown: false }}
        listeners={{
          beforeRemove: () => {
            return resetAll();
          },
        }}
      />

      <Stack.Screen
        name="posts/[postId]/edit"
        options={{ headerShown: false }}
        listeners={{
          beforeRemove: () => {
            return resetAll();
          },
        }}
      />

      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, headerBackTitle: "Back" }}
      />

      <Stack.Screen name="feelings" options={{ headerShown: false }} />

      <Stack.Screen name="tags" options={{ headerShown: false }} />

      <Stack.Screen name="post-group" options={{ headerShown: false }} />

      <Stack.Screen name="analysis-chat" options={{ headerShown: false }} />
    </Stack>
  );
}
