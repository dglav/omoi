import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useAppTheme } from "../../../../../hooks/useAppTheme";
import { format } from "@formkit/tempo";
import { useAnalysisScreenStore } from "../../../hooks/useAnalysisScreenStore";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

export const Header = () => {
  const theme = useAppTheme();
  const { startDate, endDate, goBackOneWeek, goForwardOneWeek } =
    useAnalysisScreenStore();

  return (
    <>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => goBackOneWeek()}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 60,
          }}
        >
          <ChevronLeft color={theme.colors.text} width={20} height={20} />
        </TouchableOpacity>
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
        <TouchableOpacity
          onPress={() => goForwardOneWeek()}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 60,
          }}
        >
          <ChevronRight color={theme.colors.text} width={20} height={20} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: theme.colors.textLight,
        }}
      />
    </>
  );
};
