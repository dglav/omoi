import { MessageCircleMore, Smile } from "lucide-react-native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import EmojiPicker, { ja } from "rn-emoji-keyboard";

import type { PostGroupEmoji } from "../../hooks/postGroupEmojiHooks/useGetPostGroupEmojis";
import { useAppTheme } from "../../hooks/useAppTheme";

type Props = {
  postGroupEmojis: PostGroupEmoji[];
  userId: string | undefined;
  handlePostEmoji: (emoji: string) => void;
  handleDeleteEmoji: () => void;
};

export const Footer = ({
  postGroupEmojis,
  userId,
  handlePostEmoji,
  handleDeleteEmoji,
}: Props) => {
  const theme = useAppTheme();

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  return (
    <>
      <View
        style={{
          height: 1,
          backgroundColor: theme.colors.textLight,
          marginTop: 24,
          marginBottom: 24,
        }}
      />

      <View
        style={{
          paddingHorizontal: 16,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 8,
        }}
      >
        {postGroupEmojis.map((postGroupEmoji) => (
          <Text
            key={postGroupEmoji.id}
            style={{
              fontSize: 24,
            }}
          >
            {postGroupEmoji.emoji}
          </Text>
        ))}

        <TouchableOpacity
          style={{
            padding: 12,
            borderColor: theme.colors.textLight,
            borderWidth: 1,
            borderRadius: 100,
          }}
          onPress={() => {
            setIsEmojiPickerOpen(true);
          }}
        >
          <Smile color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderColor: theme.colors.textLight,
            borderWidth: 1,
            borderRadius: 100,
            gap: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            Alert.alert("go to messages screen");
          }}
        >
          <Text
            style={{
              fontSize: theme.fontStyle.lg[1].size,
              fontWeight: theme.fontStyle.lg[1].weight,
            }}
          >
            0
          </Text>
          <MessageCircleMore color="black" />
        </TouchableOpacity>
      </View>

      <EmojiPicker
        onEmojiSelected={(data) => {
          const selectedEmoji = data.emoji;
          const myEmoji = postGroupEmojis.find(
            (emoji) => emoji.user_id === userId,
          )?.emoji;

          return selectedEmoji === myEmoji
            ? handleDeleteEmoji()
            : handlePostEmoji(selectedEmoji);
        }}
        open={isEmojiPickerOpen}
        onClose={() => setIsEmojiPickerOpen(false)}
        translation={ja}
      />
    </>
  );
};
