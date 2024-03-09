import { useRouter } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";

import { useAppTheme } from "../../hooks/useAppTheme";
import { LeftAlignedButton } from "../../screens/relationship/leftAlignedButton";

const RelationshipLength = () => {
  const theme = useAppTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push("relationship/status");
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          width: "100%",
          paddingHorizontal: 16,
          gap: 56,
        }}
      >
        <View style={{ marginTop: 56, gap: 16 }}>
          <Text
            style={{
              fontSize: theme.fontStyle.xxl[1].size,
              fontWeight: theme.fontStyle.xxl[1].weight,
            }}
          >
            交際期間
          </Text>
          <Text
            style={{
              fontSize: theme.fontStyle.md[1].size,
              fontWeight: theme.fontStyle.md[1].weight,
            }}
          >
            交際期間を教えてください
          </Text>
        </View>
        <View
          style={{
            paddingVertical: 16,
            gap: 24,
          }}
        >
          <LeftAlignedButton onPress={handlePress}>0~1年</LeftAlignedButton>
          <LeftAlignedButton onPress={handlePress}>1~2年</LeftAlignedButton>
          <LeftAlignedButton onPress={handlePress}>3~5年</LeftAlignedButton>
          <LeftAlignedButton onPress={handlePress}>6~10年</LeftAlignedButton>
          <LeftAlignedButton onPress={handlePress}>11年以上</LeftAlignedButton>
          <LeftAlignedButton onPress={handlePress}>
            まだ交際していない
          </LeftAlignedButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RelationshipLength;
