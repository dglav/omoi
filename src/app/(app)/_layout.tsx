import { Redirect, Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

import { useNotifications } from "../../hooks/useNotifications";
import { useSession } from "../../providers/AuthProvider";
import { useInitializePostStore } from "../../screens/posts/hooks/useInitializePostStore";
import { useStore as usePostStore } from "../../screens/posts/store/useStore";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  useNotifications();

  // useEffect(() => {
  //   const rerouteIfFirstSignIn = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem(IS_FIRST_SIGN_IN);
  //       if (value !== "false") {
  //         router.navigate("/survey");
  //       }
  //     } catch (e) {
  //       console.error("getting from async store failed", e);
  //     }
  //   };

  //   if (session) {
  //     rerouteIfFirstSignIn();
  //   }
  // }, [session]);

  const { resetPostState } = usePostStore((state) => ({
    resetPostState: state.resetAll,
  }));

  const { initializePostStore } = useInitializePostStore();

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
        name="posts/new"
        options={{ headerShown: false }}
        listeners={() => {
          return { focus: () => resetPostState() };
        }}
      />

      <Stack.Screen
        name="posts/[postId]/edit"
        options={{ headerShown: false }}
        listeners={() => {
          return { focus: () => initializePostStore() };
        }}
      />

      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, headerBackTitle: "Back" }}
      />

      <Stack.Screen name="feelings" options={{ headerShown: false }} />

      <Stack.Screen name="tags" options={{ headerShown: false }} />

      <Stack.Screen name="post-group" options={{ headerShown: false }} />
    </Stack>
  );
}
