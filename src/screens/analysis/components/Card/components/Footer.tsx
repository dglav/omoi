import { useRouter } from "expo-router";
import { MessageCircleMore, Smile } from "lucide-react-native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import EmojiPicker, { ja } from "rn-emoji-keyboard";

// import { usePostGroupEmojis } from "../../";
// import { useGetPostGroupMessageCount } from "../../hooks/postGroupMessageHooks/useGetPostGroupMessagesCount";
import { useAppTheme } from "../../../../../hooks/useAppTheme";
import { useGetUser } from "../../../../../hooks/userHooks/useGetUser";

type Props = {
  postGroupId: string;
};

export const Footer = ({ postGroupId }: Props) => {
  const theme = useAppTheme();
  const router = useRouter();

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  // const { postGroupEmojis, handlePostEmoji, handleDeleteEmoji } =
  //   usePostGroupEmojis({ postGroupId });
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
          width: '100%'
        }}
      >
        {/* {postGroupEmojis && */}
        {/*   postGroupEmojis.map((postGroupEmoji) => { */}
        {/*     return ( */}
        {/*       <Text */}
        {/*         key={`${postGroupEmoji.post_group_id}_${postGroupEmoji.user_id}`} */}
        {/*         style={{ */}
        {/*           fontSize: 24, */}
        {/*         }} */}
        {/*       > */}
        {/*         {postGroupEmoji.emoji} */}
        {/*       </Text> */}
        {/*     ); */}
        {/*   })} */}

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
            Alert.alert('open chat')
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
        onEmojiSelected={() => {
          // const selectedEmoji = data.emoji;
          // const myEmoji = postGroupEmojis?.find(
          //   (emoji) => emoji.user_id === user?.id,
          // )?.emoji;
          //
          // return selectedEmoji === myEmoji
          //   ? handleDeleteEmoji(postGroupId)
          //   : handlePostEmoji({ postGroupId, emoji: selectedEmoji });
        }}
        open={isEmojiPickerOpen}
        onClose={() => setIsEmojiPickerOpen(false)}
        translation={ja}
      />
    </>
  );
};
