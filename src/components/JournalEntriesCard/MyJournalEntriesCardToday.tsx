import { useRouter } from "expo-router";
import { View, Alert } from "react-native";

import { Footer } from "./Footer";
import { JournalEntryHeader } from "./JournalEntryHeader";
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

export const MyJournalEntriesCardToday = ({ postGroup }: Props) => {
  const router = useRouter();
  const theme = useAppTheme();

  const deletePostMutation = useDeletePost();

  return (
    <View key={postGroup.id}>
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
                <View key={post.id}>
                  {index === 0 && <JournalEntryHeader post={post} />}

                  {index !== 0 && (
                    <View>
                      {index === 1 && (
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

                      <JournalEntryRow post={post} />
                    </View>
                  )}
                </View>
              );
            })}

            <Footer postGroupId={postGroup.id} />
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
    </View>
  );
};
