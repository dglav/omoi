import { useRouter } from "expo-router";
import { SafeAreaView, View } from "react-native";

import { Text } from "../../../components/text";
import { useAppTheme } from "../../../hooks/useAppTheme";

export const EditFeelingsScreenLevelScreen = () => {
  const theme = useAppTheme();
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        display: "flex",
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: 56,
          paddingHorizontal: 16,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: theme.fontStyle.md[1].size,
            fontWeight: theme.fontStyle.md[1].weight,
          }}
        >
          どの感情に登録しますか？
        </Text>
      </View>
    </SafeAreaView>
  );
};
