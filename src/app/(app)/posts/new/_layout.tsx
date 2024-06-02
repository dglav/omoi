import { Stack } from "expo-router";
import React from "react";

import { BackButton } from "../../../../components/back-button";
import { PrivacyButton } from "../../../../screens/posts/components/PrivacyButton";
import { DateSelector } from "../../../../screens/posts/components/date-selector";
import { useStore } from "../../../../screens/posts/store/useStore";

export default function Layout() {
  const { date, setDate, isPrivate, setIsPrivate } = useStore(
    ({ date, setDate, isPrivate, setIsPrivate }) => ({
      date,
      setDate,
      isPrivate,
      setIsPrivate,
    }),
  );

  return (
    <Stack
      screenOptions={{
        headerTitle: () => <DateSelector date={date} setDate={setDate} />,
        headerTransparent: true,
        headerLeft: () => <BackButton />,
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
