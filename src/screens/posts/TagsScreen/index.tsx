import { useQueryClient } from "@tanstack/react-query";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

import { AddTag } from "./components/AddTag";
import { TagList } from "./components/TagList";
import { TitleSection } from "./components/TitleSection";
import { Button } from "../../../components/button";
import { useCreatePost } from "../../../hooks/postHooks/useCreatePost";
import { useEditPost } from "../../../hooks/postHooks/useEditPost";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { PostSuccessModal } from "../components/post-success-modal";
import { useStore } from "../store/useStore";

const JournalTags = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const params = useGlobalSearchParams<{ postId: string }>();
  const { condition, feelings, tags, note, date, isPrivate } = useStore();
  const [isPostSuccessModalOpen, setIsPostSuccessModalOpen] = useState(false);
  const createPostMutation = useCreatePost();
  const editPostMutation = useEditPost();
  const queryClient = useQueryClient();

  const handlePost = () => {
    const isEdit = !!params.postId;

    if (!isEdit) {
      createPostMutation.mutate(
        {
          post: {
            condition,
            feelings: feelings.map((feeling) => feeling.id),
            tags,
            note,
            date,
            isPrivate,
          },
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
          post: {
            id: params.postId,
            condition,
            feelings: feelings.map((feeling) => feeling.id),
            tags,
            note,
            isPrivate,
            date,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["postGroups"] });

            router.navigate("/(app)/(tabs)/home");
          },
        },
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        contentContainerStyle={{ flex: 1 }}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            paddingVertical: 16,
          }}
        >
          <TitleSection />

          <ScrollView
            contentContainerStyle={{
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "100%",
              paddingHorizontal: 16,
            }}
          >
            <TagList />

            <View style={{ height: 12 }} />

            <AddTag />

            <View style={{ height: 16 }} />

            <Button
              onPress={() => {
                handlePost();
              }}
            >
              投稿する
            </Button>
          </ScrollView>

          <PostSuccessModal
            visible={isPostSuccessModalOpen}
            onConfirm={() => {
              setIsPostSuccessModalOpen(false);
              router.navigate("/(app)/(tabs)/home");
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default JournalTags;
