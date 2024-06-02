import { Text } from "react-native";

import { useAppTheme } from "../hooks/useAppTheme";
import { tagMap } from "../screens/posts/TagsScreen/components/TagList/hooks/tagMap";

type Props = {
  tag: string;
};

export const TagPill = ({ tag }: Props) => {
  const theme = useAppTheme();
  const { text } = tagMap[tag];

  return (
    <Text
      style={{
        borderColor: theme.colors.textLight,
        borderRadius: 4,
        borderStyle: "solid",
        borderWidth: 1,
        paddingHorizontal: 4,
        paddingVertical: 2,
        fontSize: theme.fontStyle.xs[1].size,
        fontWeight: theme.fontStyle.xs[1].weight,
        backgroundColor: theme.colors.white,
      }}
    >
      {text}
    </Text>
  );
};
