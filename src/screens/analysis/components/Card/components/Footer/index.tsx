import { MessageCircleMore, Smile } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import EmojiPicker, { ja } from "rn-emoji-keyboard";

// import { useGetPostGroupMessageCount } from "../../hooks/postGroupMessageHooks/useGetPostGroupMessagesCount";
import { useAppTheme } from "../../../../../../hooks/useAppTheme";
import { useGetUser } from "../../../../../../hooks/userHooks/useGetUser";
import { useAnalysisScreenStore } from "../../../useAnalysisScreenStore";
import { useAnalysisResultsEmojis } from "./hooks/useAnalysisResultsEmoji";

export const Footer = () => {
  const theme = useAppTheme();
  const { startDate, endDate, user: tab } = useAnalysisScreenStore();

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const { emojis, isLoadingEmojis, handlePostEmoji, handleDeleteEmoji } =
    useAnalysisResultsEmojis({ user: tab, startDate, endDate });
  const { user } = useGetUser();
  // const { data } = useGetPostGroupMessageCount({ postGroupId });

  const count = 0;

  return (
    <>
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 16,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 8,
          width: "100%",
        }}
      >
        {emojis &&
          emojis.map((emoji) => {
            return (
              <Text
                key={`${emoji.id}_${emoji.authorId}`}
                style={{
                  fontSize: 24,
                }}
              >
                {emoji.emoji}
              </Text>
            );
          })}

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
            Alert.alert("open chat");
          }}
        >
          <Text
            style={{
              fontSize: theme.fontStyle.lg[1].size,
              fontWeight: theme.fontStyle.lg[1].weight,
            }}
          >
            {count ?? 0}
          </Text>
          <MessageCircleMore color="black" />
        </TouchableOpacity>
      </View>

      <EmojiPicker
        onEmojiSelected={async (data) => {
          const selectedEmoji = data.emoji;

          if (isLoadingEmojis) {
            return;
          }

          const mySavedEmoji = emojis?.find(
            (emoji) => emoji.authorId === user?.id,
          );

          if (!mySavedEmoji) {
            return handlePostEmoji({ emoji: selectedEmoji });
          }

          if (mySavedEmoji.emoji === selectedEmoji) {
            return handleDeleteEmoji(mySavedEmoji.id);
          }

          handleDeleteEmoji(mySavedEmoji.id);
          handlePostEmoji({ emoji: selectedEmoji });
        }}
        open={isEmojiPickerOpen}
        onClose={() => setIsEmojiPickerOpen(false)}
        translation={ja}
      />
    </>
  );
};