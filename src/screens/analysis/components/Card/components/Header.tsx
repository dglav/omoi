import React from "react";
import { Text, View } from "react-native";

import { useAppTheme } from "../../../../../hooks/useAppTheme";
import { format } from "@formkit/tempo";
import { useAnalysisScreenStore } from "../../useAnalysisScreenStore";

export const Header = () => {
  const theme = useAppTheme();
  const { startDate, endDate } = useAnalysisScreenStore();

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
        {`${format(startDate, "M/D")} ~ ${format(endDate, "M/D")}`}
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
