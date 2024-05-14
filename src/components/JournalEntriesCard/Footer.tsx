import { Smile } from "lucide-react-native";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import EmojiPicker, { ja } from "rn-emoji-keyboard";

import { useAppTheme } from "../../hooks/useAppTheme";

export const Footer = () => {
  const theme = useAppTheme();

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [emoji, setEmoji] = useState<null | string>(null);

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
        {emoji && (
          <Text
            style={{
              fontSize: 24,
            }}
          >
            {emoji}
          </Text>
        )}
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
      </View>

      <EmojiPicker
        onEmojiSelected={(data) =>
          data.emoji === emoji ? setEmoji(null) : setEmoji(data.emoji)
        }
        selectedEmojis={emoji ? [emoji] : []}
        open={isEmojiPickerOpen}
        onClose={() => setIsEmojiPickerOpen(false)}
        translation={ja}
      />
    </>
  );
};
