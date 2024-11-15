import { View } from "react-native";

import { useGetTimeBoundTags } from "./hooks/useGetTimeBoundTags";
import { TagPill } from "../../../../../../components/tag-pill";
import { Text } from "../../../../../../components/text";
import { useAppTheme } from "../../../../../../hooks/useAppTheme";
import type { Post } from "../../../../../../services/supabase/database/posts/converter";

type Props = {
  currentWeekPosts: Post[];
  isLoading: boolean;
};

export const TagSection = ({ currentWeekPosts, isLoading }: Props) => {
  const theme = useAppTheme();
  const { topTags } = useGetTimeBoundTags({ currentWeekPosts, isLoading });

  return (
    <View style={{ width: "100%" }}>
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
        >
          多い順
        </Text>
      </View>
      <View style={{ height: 16 }} />
      <View
        style={{
          padding: 16,
          gap: 8,
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {topTags.map((tag) => (
          <TagPill
            key={tag}
            tag={tag}
            paddingVertical={6}
            paddingHorizontal={8}
          />
        ))}
      </View>
    </View>
  );
};
