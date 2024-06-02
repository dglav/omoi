import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import { Button } from "../../../../components/NewButton";
import { useGetCustomTags } from "../../../../hooks/customTagHooks/useGetCustomTags";
import { useAppTheme } from "../../../../hooks/useAppTheme";

export const TitleSection = () => {
  const theme = useAppTheme();
  const { data: customTags, isLoading } = useGetCustomTags();
  const router = useRouter();

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View
        style={{
          gap: 8,
          paddingLeft: 16,
        }}
      >
        <Text
          style={{
            fontSize: theme.fontStyle.xl[1].size,
            fontWeight: theme.fontStyle.xl[1].weight,
          }}
        >
          関係していることは？
        </Text>
        <Text
          style={{
            fontSize: theme.fontStyle.md[3].size,
            fontWeight: theme.fontStyle.md[3].weight,
          }}
        >
          関連タグを設定することで、分析に役立ちます。
        </Text>
      </View>

      <View style={{ position: "relative", left: -52 }}>
        <Button
          variant="text"
          size="sm"
          isDisabled={isLoading || !customTags?.length}
          onPress={() => router.push("/tags")}
        >
          編集
        </Button>
      </View>
    </View>
  );
};
