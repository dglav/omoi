import { useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import { Button } from "../../../components/button";
import { useCreatePost } from "../../../hooks/postHooks/useCreatePost";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { PostSuccessModal } from "../../../screens/new-journal-entry/post-success-modal";
import { useStore } from "../../../screens/new-journal-entry/useStore";

const JournalNote = () => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [note, updateNote] = useStore((state) => [
    state.note,
    state.updateNote,
  ]);
  const { condition, feelings, tags } = useStore();
  const [isPostSuccessModalOpen, setIsPostSuccessModalOpen] = useState(false);
  const mutation = useCreatePost();

  const handlePost = () => {
    mutation.mutate(
      {
        post: { condition, feelings, tags, note, date: new Date() },
      },
      { onSuccess: () => setIsPostSuccessModalOpen(true) },
    );
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
                <Text>Feelings Placeholder</Text>
                <Text>Tags Placeholder</Text>
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
            router.navigate("/(app)/(tabs)/home");
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default JournalNote;
