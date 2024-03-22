import { useRouter } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";

import { useAppTheme } from "../../../hooks/useAppTheme";
import { LeftAlignedButton } from "../../../screens/relationship/leftAlignedButton";

const RelationshipStatus = () => {
  const theme = useAppTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push("/tutorial");
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
            交際ステータス
          </Text>
          <Text
            style={{
              fontSize: theme.fontStyle.md[1].size,
              fontWeight: theme.fontStyle.md[1].weight,
            }}
          >
            現在の交際ステータスを教えてください
          </Text>
        </View>
        <View
          style={{
            paddingVertical: 16,
            gap: 24,
          }}
        >
          <LeftAlignedButton onPress={handlePress}>
            交際している
          </LeftAlignedButton>
          <LeftAlignedButton onPress={handlePress}>
            同棲している
          </LeftAlignedButton>
          <LeftAlignedButton onPress={handlePress}>
            婚約している
          </LeftAlignedButton>
          <LeftAlignedButton onPress={handlePress}>
            既婚（子供なし）
          </LeftAlignedButton>
          <LeftAlignedButton onPress={handlePress}>
            既婚（子供あり）
          </LeftAlignedButton>
          <LeftAlignedButton onPress={handlePress}>事実婚</LeftAlignedButton>
          <LeftAlignedButton onPress={handlePress}>
            現在パートナーはいない
          </LeftAlignedButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RelationshipStatus;
