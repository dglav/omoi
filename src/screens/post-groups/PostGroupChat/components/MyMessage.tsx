import { Text, View } from "react-native";

import { useAppTheme } from "../../../../hooks/useAppTheme";

export const MyMessage = () => {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: 8,
      }}
    >
      <Text style={{ color: "#858585" }}>18:35</Text>
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
            fontSize: theme.fontStyle.sm[1].size,
            fontWeight: theme.fontStyle.sm[1].weight,
          }}
        >
          挑戦応援している！ファイト！絶対できるから間違いなく！！
        </Text>
      </View>
    </View>
  );
};
