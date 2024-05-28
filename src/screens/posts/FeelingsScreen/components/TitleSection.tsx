import { useRouter } from "expo-router";
import { View } from "react-native";

import { Button } from "../../../../components/NewButton";
import { Text } from "../../../../components/text";
import { useGetCustomFeelings } from "../../../../hooks/customFeelingHooks/useGetCustomFeelings";
import { useAppTheme } from "../../../../hooks/useAppTheme";

export const TitleSection = () => {
  const theme = useAppTheme();
  const { data: customFeelings, isLoading } = useGetCustomFeelings();
  const router = useRouter();

  return (
    <View
      style={{
        paddingHorizontal: 28,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: 8 }}>
        <Text
          style={{
            fontSize: theme.fontStyle.xl[1].size,
            fontWeight: theme.fontStyle.xl[1].weight,
          }}
        >
          どんな感情がある？
        </Text>
        <Text
          style={{
            fontSize: theme.fontStyle.md[3].size,
            fontWeight: theme.fontStyle.md[3].weight,
            color: theme.colors.textLight,
          }}
        >
          3つまで
        </Text>
      </View>

      <Button
        variant="text"
        size="sm"
        isDisabled={isLoading || !customFeelings?.length}
        onPress={() => router.push("/feelings")}
      >
        編集
      </Button>
    </View>
  );
};
