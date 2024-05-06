import { useQueryClient } from "@tanstack/react-query";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import { Button } from "../../../components/button";
import { MiniFeeling } from "../../../components/mini-feeling";
import { TagPill } from "../../../components/tag-pill";
import { useCreatePost } from "../../../hooks/postHooks/useCreatePost";
import { useEditPost } from "../../../hooks/postHooks/useEditPost";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { PostSuccessModal } from "../components/post-success-modal";
import { useStore } from "../store/useStore";

const JournalNote = () => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const params = useGlobalSearchParams<{ postId: string }>();
  const [note, updateNote] = useStore((state) => [
    state.note,
    state.updateNote,
  ]);
  const { condition, feelings, tags, date, resetAll } = useStore();
  const [isPostSuccessModalOpen, setIsPostSuccessModalOpen] = useState(false);
  const createPostMutation = useCreatePost();
  const editPostMutation = useEditPost();
  const queryClient = useQueryClient();

  const isEdit = !!params.postId;

  const handlePost = () => {
    if (!isEdit) {
      createPostMutation.mutate(
        {
          post: { condition, feelings, tags, note, date },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["postGroups"] });
            setIsPostSuccessModalOpen(true);
          },
        },
      );
    }

    if (!!isEdit && params.postId) {
      editPostMutation.mutate(
        {
          post: { id: params.postId, condition, feelings, tags, note, date },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["postGroups"] });
            resetAll();
            router.push("/(app)/(tabs)/home");
          },
        },
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: theme.colors.background,
      }}
    >
      <SafeAreaView>
        <View
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.background,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{
                width,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <View style={{ gap: 8, padding: 16 }}>
                {feelings.map((feeling) => (
                  <MiniFeeling key={feeling} feeling={feeling} />
                ))}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                  }}
                >
                  {tags.map((tag) => (
                    <TagPill key={tag} tag={tag} />
                  ))}
                </View>
              </View>

              <View style={{ padding: 16 }}>
                <TextInput
                  editable
                  multiline
                  value={note}
                  onChangeText={(text) => updateNote(text)}
                  placeholder="詳しく書いてみてください"
                  maxLength={2000}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 16,
            }}
          >
            <Button
              onPress={() => {
                handlePost();
              }}
            >
              投稿する
            </Button>
          </View>
        </View>

        <PostSuccessModal
          visible={isPostSuccessModalOpen}
          onConfirm={() => {
            setIsPostSuccessModalOpen(false);
            resetAll();
            router.navigate("/(app)/(tabs)/home");
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default JournalNote;
