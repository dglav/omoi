import { View } from "react-native";
import { Text } from '../../../../../components/text';
import { useAppTheme } from "../../../../../hooks/useAppTheme";
import { TagPill } from "../../../../../components/tag-pill";

export const TagSection = () => {
  const theme = useAppTheme();

  return (<View style={{ width: "100%" }}>
    <View style={{ gap: 4, alignItems: "center" }}>
      <Text
        style={{
          fontSize: theme.fontStyle.md[1].size,
          fontWeight: theme.fontStyle.md[1].weight,
        }}
      >
        関連タグ
      </Text>
      <Text
        style={{
          fontSize: theme.fontStyle.xs[3].size,
          fontWeight: theme.fontStyle.xs[3].weight,
        }}
      >多い順</Text>
    </View>
    <View style={{ height: 16 }} />
    <View style={{ padding: 16, gap: 8, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }} >
      <TagPill tag='identity' paddingVertical={6} paddingHorizontal={8} />
      <TagPill tag='family' paddingVertical={6} paddingHorizontal={8} />
      <TagPill tag='money' paddingVertical={6} paddingHorizontal={8} />
      <TagPill tag='community' paddingVertical={6} paddingHorizontal={8} />
      <TagPill tag='pet' paddingVertical={6} paddingHorizontal={8} />
    </View>
  </View>)

};
