import { useQueryClient } from "@tanstack/react-query";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Header } from "./Header";
import { Button } from "../../../components/button";
import { useCreatePost } from "../../../hooks/postHooks/useCreatePost";
import { useEditPost } from "../../../hooks/postHooks/useEditPost";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { PostSuccessModal } from "../components/post-success-modal";
import { useStore } from "../store/useStore";

const JournalNote = () => {
  const theme = useAppTheme();
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <Header feelings={feelings} tags={tags} />

              <ScrollView
                style={{
                  paddingHorizontal: 16,
                  width: "100%",
                }}
                keyboardDismissMode="none"
              >
                <TextInput
                  multiline
                  value={note}
                  onChangeText={(text) => updateNote(text)}
                  placeholder="詳しく書いてみてください"
                  maxLength={2000}
                  autoFocus
                />
              </ScrollView>

              <View
                style={{
                  width: "100%",
                  padding: 16,
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default JournalNote;
