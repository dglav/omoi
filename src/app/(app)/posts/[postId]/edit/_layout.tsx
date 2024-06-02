import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";

import { BackButton } from "../../../../../components/back-button";
import { useGetPost } from "../../../../../hooks/postHooks/useGetPost";
import { PrivacyButton } from "../../../../../screens/posts/components/PrivacyButton";
import { DateSelector } from "../../../../../screens/posts/components/date-selector";
import { useStore } from "../../../../../screens/posts/store/useStore";

export default function Layout() {
  const params = useLocalSearchParams<{ postId: string }>();
  const { data: post, isLoading } = useGetPost(params.postId!);
  const { date, setDate, isPrivate, setIsPrivate, resetTo } = useStore(
    ({ date, setDate, isPrivate, setIsPrivate, resetTo }) => ({
      date,
      setDate,
      isPrivate,
      setIsPrivate,
      resetTo,
    }),
  );

  useEffect(() => {
    if (!isLoading && post) {
      resetTo(post);
    }
  }, [isLoading]);

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <PrivacyButton
            isPrivate={isPrivate}
            onPress={() => setIsPrivate(!isPrivate)}
          />
        ),
      }}
    >
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
