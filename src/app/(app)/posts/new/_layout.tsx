import { Stack } from "expo-router";
import React from "react";

import { BackButton } from "../../../../components/back-button";
import { useAppTheme } from "../../../../hooks/useAppTheme";
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

  const theme = useAppTheme();

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

      <Stack.Screen
        name="feelings"
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      />

      <Stack.Screen
        name="tags"
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      />

      <Stack.Screen name="note" />
    </Stack>
  );
}
