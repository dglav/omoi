import React from "react";
import { Text, View } from "react-native";

import { useAppTheme } from "../../../../../hooks/useAppTheme";

export const Header = () => {
  const theme = useAppTheme();

  return (
    <View style={{ width: "100%" }}>
      <Text
        style={{
          fontSize: theme.fontStyle.md[1].size,
          fontWeight: theme.fontStyle.md[1].weight,
          marginVertical: 16,
          textAlign: "center",
        }}
      >
        2/20~2/27
      </Text>

      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: theme.colors.textLight,
        }}
      />
    </View>
  );
};
