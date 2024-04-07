import { Stack } from "expo-router";
import React from "react";

import { BackButton } from "../../../components/back-button";
import { DateSelector } from "../../../screens/new-journal-entry/date-selector";
import { useStore } from "../../../screens/new-journal-entry/useStore";

export default function Layout() {
  const { date, setDate } = useStore(({ date, setDate }) => ({
    date,
    setDate,
  }));

  return (
    <Stack>
      <Stack.Screen
        name="condition"
        options={{
          headerTitle: () => <DateSelector date={date} setDate={setDate} />,
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="feelings"
        options={{
          headerTitle: () => <DateSelector date={date} setDate={setDate} />,
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="tags"
        options={{
          headerTitle: () => <DateSelector date={date} setDate={setDate} />,
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="note"
        options={{
          headerTitle: () => <DateSelector date={date} setDate={setDate} />,
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
