import { View, Text } from "react-native";

import { ConditionIcon_36 } from "../../components/condition-icon-36";
import type { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../../hooks/useAppTheme";
import { conditionMap } from "../../utils/conditionMap";

type Props = {
  postGroup: ReturnType<typeof useGetPostGroups>["data"][0];
};

export const JournalEntriesCard = ({ postGroup }: Props) => {
  const theme = useAppTheme();

  return (
    <View key={postGroup.id}>
      <Text>{postGroup.postGroupDate}</Text>

      <View
        key={postGroup.id}
        style={{
          backgroundColor: theme.colors.white,
          width: "100%",
          borderRadius: 16,
          paddingVertical: 24,
        }}
      >
        {postGroup.posts.map((post) => (
          <View style={{ padding: 16, gap: 16 }}>
            <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
              <ConditionIcon_36 stroke={conditionMap[post.condition].stroke} />
              <View style={{ gap: 4 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                  }}
                >
                  {post.feelings.map((feeling) => (
                    <Text>{feeling}</Text>
                  ))}
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                  }}
                >
                  {post.tags.map((tag) => (
                    <Text>{tag}</Text>
                  ))}
                </View>
              </View>
            </View>
            <Text>{post.note}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
