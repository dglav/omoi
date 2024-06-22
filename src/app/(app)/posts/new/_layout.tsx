import { Stack } from "expo-router";
import React, { useEffect } from "react";

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

  /**
    * Without this, the post date is always going to show to date from the last time the user 
    * attempted to add a new journal entry.
    */
  useEffect(() => {
    setDate(new Date());
  }, []);

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
        animation: "simple_push",
      }}
    >
      <Stack.Screen name="condition" />

      <Stack.Screen name="feelings" />

      <Stack.Screen name="tags" />

      <Stack.Screen name="note" />
    </Stack>
  );
}
