import { format } from "@formkit/tempo";
import { Text, View } from "react-native";

import { useAppTheme } from "../../../../../hooks/useAppTheme";

type Props = {
  messageText: string;
  messageDate: Date;
};

export const MyMessage = ({ messageText, messageDate }: Props) => {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: 8,
        marginBottom: 10,
        marginHorizontal: 10,
      }}
    >
      <Text style={{ color: "#858585" }}>{format(messageDate, "HH:mm")}</Text>
      <View
        style={{
          backgroundColor: theme.colors.textColor,
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderRadius: 32,
          borderTopEndRadius: 0,
          maxWidth: "75%",
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: theme.fontStyle.sm[3].size,
            fontWeight: theme.fontStyle.sm[3].weight,
          }}
        >
          {messageText}
        </Text>
      </View>
    </View>
  );
};
