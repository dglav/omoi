import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable } from "react-native";

import { useAppTheme } from "../hooks/useAppTheme";

export const BackButton = () => {
  const router = useRouter();
  const theme = useAppTheme();

  return (
    <Pressable onPress={() => router.back()}>
      <ChevronLeft color={theme.colors.text} />
    </Pressable>
  );
};
