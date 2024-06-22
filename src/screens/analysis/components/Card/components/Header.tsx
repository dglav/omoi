import React from "react";
import { Text, View } from "react-native";

import { useAppTheme } from "../../../../../hooks/useAppTheme";
import { format } from "@formkit/tempo";

type Props = {
  timePeriod: {
    start: Date;
    end: Date;
  }
}
export const Header = ({ timePeriod }: Props) => {
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
        {`${format(timePeriod.start, 'M/D')} ~ ${format(timePeriod.end, 'M/D')}`}
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
