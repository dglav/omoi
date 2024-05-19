import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import React, { StrictMode, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { HAS_VIEWED_INTRODUCTION } from "../asyncStorageConstants";
import { BackButton } from "../components/back-button";
import { AuthProvider } from "../providers/AuthProvider";
import { ThemeProvider } from "../providers/ThemeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

export default function Root() {
  const router = useRouter();

  useEffect(() => {
    const rerouteIfFirstLoad = async () => {
      try {
        const value = await AsyncStorage.getItem(HAS_VIEWED_INTRODUCTION);
        if (value !== "true") {
          router.navigate("/introduction");
        }
      } catch (e) {
        console.error("getting from async store failed", e);
      }
    };

    rerouteIfFirstLoad();
  }, []);

  return (
    <StrictMode>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <Stack>
                <Stack.Screen
                  name="introduction"
                  options={{
                    headerTitle: "Omoi β版",
                    headerTransparent: true,
                    headerBackVisible: false,
                  }}
                />

                <Stack.Screen name="index" options={{ headerShown: false }} />

                <Stack.Screen
                  name="signIn"
                  options={{
                    headerTitle: "ログイン",
                    headerTransparent: true,
                    headerLeft: () => <BackButton />,
                  }}
                />

                <Stack.Screen
                  name="signUp"
                  options={{
                    headerTitle: "アカウント作成",
                    headerTransparent: true,
                    headerLeft: () => <BackButton />,
                  }}
                />

                <Stack.Screen
                  name="(app)"
                  options={{ headerShown: false, headerBackTitle: "Back" }}
                />
              </Stack>
            </QueryClientProvider>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </StrictMode>
  );
}
