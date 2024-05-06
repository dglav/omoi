import { addDay, format, parse } from "@formkit/tempo";
import { View, Text } from "react-native";

import { JournalEntryHeader } from "./JournalEntryHeader";
import { JournalEntryRow } from "./JournalEntryRow";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemIcon,
  ContextMenuItemTitle,
  ContextMenuRoot,
  ContextMenuTrigger,
} from "../../components/ContextMenu";
import type { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../../hooks/useAppTheme";

type Props = {
  postGroup: ReturnType<typeof useGetPostGroups>["data"][0];
};

export const JournalEntriesCard = ({ postGroup }: Props) => {
  const theme = useAppTheme();

  const now = new Date();
  const postGroupDate = parse(postGroup.postGroupDate, "YYYY-MM-DD");
  const dayOfTheWeek = new Intl.DateTimeFormat("ja-JP", {
    weekday: "short",
  }).format(postGroupDate);
  const isToday = now.getDay() === postGroupDate.getDay();
  const isYesterday = now.getDay() === addDay(postGroupDate, 1).getDay();
  const isBeforeYesterday = !isToday && !isYesterday;

  return (
    <View key={postGroup.id}>
      {isYesterday && (
        <>
          <Text
            style={{
              fontSize: theme.fontStyle.xl[3].size,
              fontWeight: theme.fontStyle.xl[3].weight,
            }}
          >
            昨日
          </Text>
          <View style={{ height: 16 }} />
        </>
      )}

      {isBeforeYesterday && (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text
              style={{
                fontSize: theme.fontStyle.xxl[3].size,
                fontWeight: theme.fontStyle.xxl[3].weight,
              }}
            >
              {format(postGroupDate, "DD")}
            </Text>
            <Text
              style={{
                fontSize: theme.fontStyle.md[3].size,
                fontWeight: theme.fontStyle.md[3].weight,
              }}
            >
              ({dayOfTheWeek})
            </Text>
          </View>

          <View style={{ height: 16 }} />
        </>
      )}

      <ContextMenuRoot style={{ borderRadius: 16 }}>
        <ContextMenuTrigger>
          <View
            style={{
              backgroundColor: theme.colors.white,
              width: "100%",
              borderRadius: 16,
              paddingVertical: 24,
            }}
          >
            {postGroup.posts.map((post, index) => {
              if (isToday && index === 0) {
                return <JournalEntryHeader key={post.id} post={post} />;
              }
              return (
                <View key={post.id}>
                  {isToday && index === 1 && (
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          height: 1,
                          width: "92%",
                          backgroundColor: theme.colors.textLight,
                        }}
                      />
                    </View>
                  )}
                  <JournalEntryRow key={post.id} post={post} />
                </View>
              );
            })}
          </View>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem key="edit">
            <ContextMenuItemTitle>編集</ContextMenuItemTitle>
            <ContextMenuItemIcon
              ios={{ name: "pencil" }}
              androidIconName="baseline_format_paint"
            />
          </ContextMenuItem>

          <ContextMenuItem key="delete" destructive>
            <ContextMenuItemTitle>最新の投稿を削除</ContextMenuItemTitle>
            <ContextMenuItemIcon
              ios={{ name: "trash" }}
              androidIconName="baseline_delete"
            />
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuRoot>

      {/* </ContextMenu> */}
    </View>
  );
};
