import { Text, View } from "react-native";

import { useAppTheme } from "../../../../../../hooks/useAppTheme";
import { format } from "@formkit/tempo";

type Props = {
  messageText: string;
  messageDate: Date;
};

export const PartnerMessage = ({ messageText, messageDate }: Props) => {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        gap: 8,
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.white,
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderRadius: 32,
          borderBottomLeftRadius: 0,
          maxWidth: "75%",
        }}
      >
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.fontStyle.sm[1].size,
            fontWeight: theme.fontStyle.sm[1].weight,
          }}
        >
          {messageText}
        </Text>
      </View>
      <Text style={{ color: "#858585" }}>{format(messageDate, "HH:mm")}</Text>
    </View>
  );
};