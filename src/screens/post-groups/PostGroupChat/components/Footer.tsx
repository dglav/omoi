import { useLocalSearchParams } from "expo-router";
import { SendHorizonal } from "lucide-react-native";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

import { useCreatePostGroupMessage } from "../../../../hooks/postGroupMessageHooks/useCreatePostGroupMessage";
import { useAppTheme } from "../../../../hooks/useAppTheme";

export const Footer = () => {
  const theme = useAppTheme();
  const { postGroupId } = useLocalSearchParams();
  const [message, setMessage] = useState<string>("");
  const { mutate } = useCreatePostGroupMessage({
    onSuccess: () => setMessage(""),
  });

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 17,
        paddingBottom: 0,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TextInput
        placeholder="メッセージを入力"
        placeholderTextColor="#667085"
        value={message}
        onChangeText={(text) => setMessage(text)}
        style={{
          backgroundColor: "#E9E9E9",
          color: theme.colors.text,
          fontSize: theme.fontStyle.sm[3].size,
          fontWeight: theme.fontStyle.sm[3].weight,
          paddingHorizontal: 16,
          paddingBottom: 14,
          paddingTop: 14,
          borderRadius: 22,
          flex: 1,
        }}
        multiline
      />

      <View
        style={{
          width: 14,
          height: "100%",
        }}
      />

      <View
        style={{
          gap: 16,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (message.length > 0) {
              if (typeof postGroupId !== "string") {
                throw Error("A valid post group id was not found");
              }
              return mutate({ postGroupId, message });
            }
          }}
        >
          <SendHorizonal color="#667085" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
