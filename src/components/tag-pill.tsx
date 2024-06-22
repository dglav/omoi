import { Text } from "react-native";

import { useAppTheme } from "../hooks/useAppTheme";
import { tagMap } from "../screens/posts/TagsScreen/components/TagList/hooks/tagMap";

type Props = {
  tag: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
};

export const TagPill = ({ tag, paddingVertical, paddingHorizontal }: Props) => {
  const theme = useAppTheme();
  const text = tagMap[tag]?.text ?? tag;

  return (
    <Text
      style={{
        borderColor: theme.colors.textLight,
        borderRadius: 4,
        borderStyle: "solid",
        borderWidth: 1,
        paddingHorizontal: paddingHorizontal ?? 4,
        paddingVertical: paddingVertical ?? 2,
        fontSize: theme.fontStyle.xs[1].size,
        fontWeight: theme.fontStyle.xs[1].weight,
        backgroundColor: theme.colors.white,
      }}
    >
      {text}
    </Text>
  );
};
