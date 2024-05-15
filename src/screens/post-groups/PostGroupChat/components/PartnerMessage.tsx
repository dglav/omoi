import { Text, View } from "react-native";

import { useAppTheme } from "../../../../hooks/useAppTheme";

export const PartnerMessage = () => {
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
          いつもありがとう！！がんばる！！💪
        </Text>
      </View>
      <Text style={{ color: "#858585" }}>19:35</Text>
    </View>
  );
};
