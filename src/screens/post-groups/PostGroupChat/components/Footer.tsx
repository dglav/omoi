import { SendHorizonal, Smile } from "lucide-react-native";
import { TextInput, TouchableOpacity, View } from "react-native";

import { useAppTheme } from "../../../../hooks/useAppTheme";

export const Footer = () => {
  const theme = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 17,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TextInput
        placeholder="メッセージを入力"
        placeholderTextColor="#667085"
        style={{
          backgroundColor: "#E9E9E9",
          color: theme.colors.text,
          fontSize: theme.fontStyle.sm[3].size,
          fontWeight: theme.fontStyle.sm[3].weight,
          paddingHorizontal: 18,
          paddingVertical: 14,
          borderRadius: 22,
          flexGrow: 1,
        }}
      />

      <View style={{ width: 14 }} />

      <View style={{ gap: 16, flexDirection: "row" }}>
        <TouchableOpacity>
          <Smile color="#667085" />
        </TouchableOpacity>
        <TouchableOpacity>
          <SendHorizonal color="#667085" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
