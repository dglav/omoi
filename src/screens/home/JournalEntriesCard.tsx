import { format } from "@formkit/tempo";
import { View, Text } from "react-native";

import { ConditionIcon_36 } from "../../components/condition-icon-36";
import { MiniFeeling } from "../../components/mini-feeling";
import { TagPill } from "../../components/tag-pill";
import type { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../../hooks/useAppTheme";
import { conditionMap } from "../../utils/conditionMap";
import { feelingMap } from "../../utils/feelingMap";
import { tagMap } from "../../utils/tagMap";

type Props = {
  postGroup: ReturnType<typeof useGetPostGroups>["data"][0];
};

export const JournalEntriesCard = ({ postGroup }: Props) => {
  const theme = useAppTheme();

  return (
    <View>
      <Text>{postGroup.postGroupDate}</Text>

      <View
        style={{
          backgroundColor: theme.colors.white,
          width: "100%",
          borderRadius: 16,
          paddingVertical: 24,
        }}
      >
        {postGroup.posts.map((post) => (
          <View key={post.id} style={{ padding: 16, gap: 16 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                <ConditionIcon_36
                  stroke={conditionMap[post.condition].stroke}
                />
                <View style={{ gap: 4 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 8,
                    }}
                  >
                    {post.feelings.map((feeling) => {
                      return <MiniFeeling feeling={feeling} />;
                    })}
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 8,
                    }}
                  >
                    {post.tags.map((tag) => {
                      return <TagPill key={tag} tag={tag} />;
                    })}
                  </View>
                </View>
              </View>

              <Text
                style={{
                  fontSize: theme.fontStyle.xs[3].size,
                  fontWeight: theme.fontStyle.xs[3].weight,
                }}
              >
                {format(new Date(post.date), "HH:mm")}
              </Text>
            </View>

            <Text
              style={{
                fontSize: theme.fontStyle.sm[3].size,
                fontWeight: theme.fontStyle.sm[3].weight,
              }}
            >
              {post.note}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
