import { format } from "@formkit/tempo";
import { CalendarDays } from "lucide-react-native";
import React from "react";
import { View, Text } from "react-native";

import { useAppTheme } from "../../hooks/useAppTheme";

type Props = {
  date: Date;
  // setDate: (date: Date) => void;
};

export const DateSelector = ({ date }: Props) => {
  const theme = useAppTheme();
  const formattedDate = format(date, "YYYY/MM/DD");

  return (
    <View
      style={{
        backgroundColor: theme.colors.white,
        paddingHorizontal: 17,
        paddingVertical: 8.5,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <CalendarDays color={theme.colors.text} size={20} />
      <Text
        style={{
          fontSize: theme.fontStyle.md["3"].size,
          fontWeight: theme.fontStyle.md["3"].weight,
        }}
      >
        {formattedDate}
      </Text>
    </View>
  );
};
