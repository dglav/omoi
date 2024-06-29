import { format } from "@formkit/tempo";
import { LockKeyhole } from "lucide-react-native";
import { Text, View } from "react-native";

import { useAppTheme } from "../../hooks/useAppTheme";
import { conditionMap } from "../../utils/conditionMap";
import { ConditionIcon_36 } from "../condition-icon-36";
import { MiniFeeling } from "../mini-feeling";
import { TagPill } from "../tag-pill";
import { Post } from "../../services/supabase/database/posts/converter";

type Props = {
  post: Post;
};

export const JournalEntryRow = ({ post }: Props) => {
  const theme = useAppTheme();

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
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
              {post.feelings.map((feeling) => {
                return <MiniFeeling key={feeling.id} feeling={feeling} />;
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

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Text
            style={{
              fontSize: theme.fontStyle.xs[3].size,
              fontWeight: theme.fontStyle.xs[3].weight,
            }}
          >
            {format(new Date(post.date), "HH:mm")}
          </Text>

          {post.isPrivate && (
            <View
              style={{
                backgroundColor: theme.colors.primaryHeavy,
                padding: 4,
                borderRadius: 16,
              }}
            >
              <LockKeyhole size={16} color={theme.colors.white} />
            </View>
          )}
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
