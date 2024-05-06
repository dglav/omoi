import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";

import { BackButton } from "../../../../../components/back-button";
import { useGetPost } from "../../../../../hooks/postHooks/useGetPost";
import { DateSelector } from "../../../../../screens/posts/components/date-selector";
import { useStore } from "../../../../../screens/posts/store/useStore";

export default function Layout() {
  const params = useLocalSearchParams<{ postId: string }>();
  const { data: post, isLoading } = useGetPost(params.postId!);
  const { date, setDate, resetTo } = useStore(({ date, setDate, resetTo }) => ({
    date,
    setDate,
    resetTo,
  }));

  useEffect(() => {
    if (!isLoading && post) {
      resetTo(post);
    }
  }, [isLoading]);

  return (
    <Stack>
      <Stack.Screen
        name="condition"
        options={{
          headerTitle: () => <DateSelector date={date} setDate={setDate} />,
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
        // initialParams={{ postId: params.postId }}
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
