import { Text, View, useWindowDimensions } from "react-native";

import { useAppTheme } from "../../../../hooks/useAppTheme";

export const TitleSection = () => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        width,
        gap: 8,
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontSize: theme.fontStyle.xl[1].size,
          fontWeight: theme.fontStyle.xl[1].weight,
        }}
      >
        関係していることは？
      </Text>
      <Text
        style={{
          fontSize: theme.fontStyle.md[3].size,
          fontWeight: theme.fontStyle.md[3].weight,
        }}
      >
        関連タグを設定することで、分析に役立ちます。
      </Text>
    </View>
  );
};
