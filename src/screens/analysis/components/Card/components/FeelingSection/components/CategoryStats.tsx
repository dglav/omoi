import { View } from "react-native";

import { Text } from "../../../../../../../components/text";
import { useAppTheme } from "../../../../../../../hooks/useAppTheme";

type Props = {
  title: string;
  currentWeekPercentage: number;
  lastWeekPercentage?: number;
};

export const CategoryStats = (
  { title, currentWeekPercentage, lastWeekPercentage }: Props,
) => {
  const theme = useAppTheme();
  const percentChange = lastWeekPercentage
    ? currentWeekPercentage - lastWeekPercentage
    : null;

  return (
    <View style={{ flex: 1, alignItems: "center", width: 104 }}>
      <Text
        style={{
          fontSize: theme.fontStyle.xs[3].size,
          fontWeight: theme.fontStyle.xs[3].weight,
        }}
      >
        {title}
      </Text>

      <View style={{ height: 5 }} />

      <View style={{ flexDirection: "row", alignItems: "baseline", gap: 2 }}>
        <Text
          style={{
            fontSize: theme.fontStyle.lg[1].size,
            fontWeight: theme.fontStyle.lg[1].weight,
          }}
        >
          {currentWeekPercentage}
        </Text>
        <Text
          style={{
            fontSize: theme.fontStyle.xs[1].size,
            fontWeight: theme.fontStyle.xs[1].weight,
          }}
        >
          %
        </Text>
      </View>

      {percentChange && (
        <Text
          style={{
            color: percentChange >= 0
              ? theme.colors.primary
              : theme.colors.danger,
            fontSize: theme.fontStyle.xs[1].size,
            fontWeight: theme.fontStyle.xs[1].weight,
          }}
        >
          {`${percentChange > 0 ? "+" : ""}${percentChange}%`}
        </Text>
      )}
    </View>
  );
};