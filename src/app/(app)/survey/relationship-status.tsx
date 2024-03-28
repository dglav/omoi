import { useRouter } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";

import { useAppTheme } from "../../../hooks/useAppTheme";
import { LeftAlignedButton } from "../../../screens/relationship/leftAlignedButton";
import { useStore } from "../../../screens/survey/useStore";

const options = [
  { text: "交際している", value: "交際している" },
  { text: "同棲している", value: "同棲している" },
  { text: "婚約している", value: "婚約している" },
  { text: "既婚（子供なし）", value: "既婚（子供なし）" },
  { text: "既婚（子供あり）", value: "既婚（子供あり）" },
  { text: "現在パートナーはいない", value: "現在パートナーはいない" },
];

const RelationshipStatus = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const { setRelationshipStatus } = useStore();

  const handlePress = (answer: string) => {
    setRelationshipStatus(answer);
    router.navigate("/survey/conversation-amount");
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
          {options.map((option) => (
            <LeftAlignedButton onPress={() => handlePress(option.value)}>
              {option.text}
            </LeftAlignedButton>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RelationshipStatus;
