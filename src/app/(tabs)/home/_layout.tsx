import { Stack } from "expo-router";
import React from "react";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="mood-share"
        options={{ headerTitle: "Mood Share", headerBackTitle: "Back" }}
      />
    </Stack>
  );
};

export default HomeLayout;
