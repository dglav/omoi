import { Redirect, Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

import { useSession } from "../../providers/AuthProvider";

export default function AppLayout() {
  const { session, isLoading } = useSession();

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

      <Stack.Screen name="posts/new" options={{ headerShown: false }} />

      <Stack.Screen
        name="posts/[postId]/edit"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, headerBackTitle: "Back" }}
      />

      <Stack.Screen name="feelings" options={{ headerShown: false }} />

      <Stack.Screen name="post-group" options={{ headerShown: false }} />
    </Stack>
  );
}
