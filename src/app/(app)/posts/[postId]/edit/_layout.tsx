import { Stack } from "expo-router";
import React from "react";

import { BackButton } from "../../../../../components/back-button";
import { PrivacyButton } from "../../../../../screens/posts/components/PrivacyButton";
import { DateSelector } from "../../../../../screens/posts/components/date-selector";
import { useInitializePostStore } from "../../../../../screens/posts/hooks/useInitializePostStore";
import { useStore } from "../../../../../screens/posts/store/useStore";

export default function Layout() {
  useInitializePostStore();
  const { date, setDate, isPrivate, setIsPrivate } = useStore(
    ({ date, setDate, isPrivate, setIsPrivate, resetTo }) => ({
      date,
      setDate,
      isPrivate,
      setIsPrivate,
      resetTo,
    }),
  );

  return (
    <Stack
      screenOptions={{
        animation: "simple_push",
        headerTransparent: true,
        headerLeft: () => <BackButton />,
        headerTitle: () => <DateSelector date={date} setDate={setDate} />,
        headerRight: () => (
          <PrivacyButton
            isPrivate={isPrivate}
            onPress={() => setIsPrivate(!isPrivate)}
          />
        ),
      }}
    >
      <Stack.Screen name="condition" />

      <Stack.Screen name="feelings" />

      <Stack.Screen name="tags" />

      <Stack.Screen name="note" />
    </Stack>
  );
}
