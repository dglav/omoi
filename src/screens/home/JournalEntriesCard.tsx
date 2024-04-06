import { View, Text } from "react-native";

import { ConditionIcon_36 } from "../../components/condition-icon-36";
import { FeelingIcon_16 } from "../../components/feeling-icon-16";
import type { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../../hooks/useAppTheme";
import { conditionMap } from "../../utils/conditionMap";
import { feelingMap } from "../../utils/feelingMap";
import { tagMap } from "../../utils/tagMap";
import { format } from "@formkit/tempo";

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
                      const { fillColor, text } = feelingMap[feeling];
                      return (
                        <View
                          key={feeling}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 4,
                          }}
                        >
                          <FeelingIcon_16 fill={fillColor} />
                          <Text
                            style={{
                              fontSize: theme.fontStyle.sm[3].size,
                              fontWeight: theme.fontStyle.sm[3].weight,
                            }}
                          >
                            {text}
                          </Text>
                        </View>
                      );
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
                      const { text } = tagMap[tag];
                      return (
                        <Text
                          key={text}
                          style={{
                            borderColor: theme.colors.textLight,
                            borderRadius: 4,
                            borderStyle: "solid",
                            borderWidth: 2,
                            paddingHorizontal: 4,
                            paddingVertical: 2,
                            fontSize: theme.fontStyle.xs[1].size,
                            fontWeight: theme.fontStyle.xs[1].weight,
                          }}
                        >
                          {text}
                        </Text>
                      );
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
