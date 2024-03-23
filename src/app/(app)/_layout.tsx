import { Redirect, Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text } from "react-native";

import { useSession } from "../../providers/SessionProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIRST_SIGN_IN } from "../../asyncStorageConstants";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    const rerouteIfFirstSignIn = async () => {
      try {
        const value = await AsyncStorage.getItem(FIRST_SIGN_IN);
        console.log({ FIRST_SIGN_IN: value });
        if (value !== "true") {
          router.navigate("/survey");
        }
      } catch (e) {
        console.error("getting from async store failed", e);
      }
    };

    if (session) {
      rerouteIfFirstSignIn();
    }
  }, [session]);

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

      <Stack.Screen name="new-journal-entry" options={{ headerShown: false }} />

      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, headerBackTitle: "Back" }}
      />
    </Stack>
  );
}
