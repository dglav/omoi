import { SendHorizontal } from "lucide-react-native";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

import { useAppTheme } from "../../../hooks/useAppTheme";

type Props = {
  sendNewMessage: ({ message }: { message: string }) => void;
};

export const Footer = ({ sendNewMessage }: Props) => {
  const theme = useAppTheme();
  const [message, setMessage] = useState<string>("");

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
              sendNewMessage({ message });
              setMessage("");
            }
          }}
        >
          <SendHorizontal color="#667085" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
