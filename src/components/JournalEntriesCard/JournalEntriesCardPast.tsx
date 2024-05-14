import { format, parse, dayStart, dayEnd, addDay } from "@formkit/tempo";
import { useRouter } from "expo-router";
import { View, Text, Alert } from "react-native";

import { Footer } from "./Footer";
import { JournalEntryRow } from "./JournalEntryRow";
import type { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";
import { useDeletePost } from "../../hooks/postHooks/useDeletePost";
import { useAppTheme } from "../../hooks/useAppTheme";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemIcon,
  ContextMenuItemTitle,
  ContextMenuRoot,
  ContextMenuTrigger,
} from "../ContextMenu";

type Props = {
  postGroup: ReturnType<typeof useGetPostGroups>["data"][0];
};

export const JournalEntriesCardPast = ({ postGroup }: Props) => {
  const theme = useAppTheme();
  const router = useRouter();

  const deletePostMutation = useDeletePost();

  const now = new Date();
  const postGroupDate = parse(postGroup.postGroupDate, "YYYY-MM-DD");
  const dayOfTheWeek = new Intl.DateTimeFormat("ja-JP", {
    weekday: "short",
  }).format(postGroupDate);

  const startOfToday = dayStart(now);
  const endOfToday = dayEnd(now);
  const startOfYesterday = addDay(startOfToday, -1);
  const endOfYesterday = addDay(endOfToday, -1);

  const isToday = postGroupDate >= startOfToday && postGroupDate < endOfToday;
  const isYesterday =
    postGroupDate >= startOfYesterday && postGroupDate < endOfYesterday;
  const isBeforeYesterday = postGroupDate < startOfYesterday;

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
              return (
                <>
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

                  {index === postGroup.posts.length - 1 && <Footer />}
                </>
              );
            })}
          </View>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem
            key="edit"
            onSelect={() =>
              postGroup.posts.length >= 2
                ? router.push(
                    `home/select-post?date=${postGroup.postGroupDate}`,
                  )
                : router.push(`/posts/${postGroup.posts[0].id}/edit`)
            }
          >
            <ContextMenuItemTitle>編集</ContextMenuItemTitle>
            <ContextMenuItemIcon
              ios={{ name: "pencil" }}
              androidIconName="baseline_format_paint"
            />
          </ContextMenuItem>

          <ContextMenuItem
            key="delete"
            destructive
            onSelect={() => {
              Alert.alert(
                "最新の投稿を削除",
                "この操作は取り消せません。よろしいですか？",
                [
                  { text: "キャンセル" },
                  {
                    text: "削除",
                    style: "destructive",
                    onPress: () =>
                      deletePostMutation.mutate({ id: postGroup.posts[0].id }),
                  },
                ],
              );
            }}
          >
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
