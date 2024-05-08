import { format } from "@formkit/tempo";
import { View, Text } from "react-native";

import { ConditionIcon_80 } from "./condition-icon-80";
import { MiniFeeling } from "./mini-feeling";
import { TagPill } from "./tag-pill";
import { useGetPostGroups } from "../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../hooks/useAppTheme";
import { conditionMap } from "../utils/conditionMap";

type Props = {
  post: ReturnType<typeof useGetPostGroups>["data"][0]["posts"][0];
};

export const JournalEntryHeader = ({ post }: Props) => {
  const theme = useAppTheme();

  return (
    <View key={post.id} style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
      <View>
        <Text
          style={{
            fontSize: theme.fontStyle.sm["3"].size,
            fontWeight: theme.fontStyle.sm["3"].weight,
            textAlign: "center",
          }}
        >
          今日のあなた
        </Text>
        <View style={{ height: 8 }} />
        <Text
          style={{
            fontSize: theme.fontStyle.xs["3"].size,
            fontWeight: theme.fontStyle.xs["3"].weight,
            textAlign: "center",
          }}
        >
          {format(post.date, "HH:mm")}
        </Text>
        <View style={{ height: 8 }} />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            paddingVertical: 16,
          }}
        >
          <ConditionIcon_80 stroke={conditionMap[post.condition].stroke} />
          <View style={{ gap: 4 }}>
            <View
              style={{ height: 38, display: "flex", justifyContent: "center" }}
            >
              <Text
                style={{
                  fontSize: theme.fontStyle.xl["1"].size,
                  fontWeight: theme.fontStyle.xl["1"].weight,
                }}
              >
                {conditionMap[post.condition].text}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
              }}
            >
              {post.feelings.map((feeling) => {
                return <MiniFeeling key={feeling} feeling={feeling} />;
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
  );
};
