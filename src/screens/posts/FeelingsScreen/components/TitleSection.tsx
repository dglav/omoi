import { View } from "react-native";

import { Text } from "../../../../components/text";
import { useAppTheme } from "../../../../hooks/useAppTheme";

export const TitleSection = () => {
  const theme = useAppTheme();

  return (
    <View style={{ gap: 8, paddingHorizontal: 28 }}>
      <Text
        style={{
          fontSize: theme.fontStyle.xl[1].size,
          fontWeight: theme.fontStyle.xl[1].weight,
        }}
      >
        どんな感情がある？
      </Text>
      <Text
        style={{
          fontSize: theme.fontStyle.md[3].size,
          fontWeight: theme.fontStyle.md[3].weight,
          color: theme.colors.textLight,
        }}
      >
        3つまで
      </Text>
    </View>
  );
};
