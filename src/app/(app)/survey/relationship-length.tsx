import { useRouter } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";

import { useAppTheme } from "../../../hooks/useAppTheme";
import { LeftAlignedButton } from "../../../screens/relationship/leftAlignedButton";
import { useStore } from "../../../screens/survey/useStore";

const options = [
  { text: "0~1年", value: "0~1年" },
  { text: "1~2年", value: "1~2年" },
  { text: "3~5年", value: "3~5年" },
  { text: "6~10年", value: "6~10年" },
  { text: "11年以上", value: "11年以上" },
  { text: "まだ交際していない", value: "まだ交際していない" },
];

const RelationshipLength = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const { setRelationshipLength } = useStore();

  const handlePress = (answer: string) => {
    setRelationshipLength(answer);
    router.push("/survey/relationship-status");
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
            交際の期間
          </Text>
          <Text
            style={{
              fontSize: theme.fontStyle.md[1].size,
              fontWeight: theme.fontStyle.md[1].weight,
            }}
          >
            2人の関係が始まってからどれくらいが経ちますか？
          </Text>
        </View>
        <View
          style={{
            paddingVertical: 16,
            gap: 24,
          }}
        >
          {options.map((option) => (
            <LeftAlignedButton
              key={option.text}
              onPress={() => handlePress(option.value)}
            >
              {option.text}
            </LeftAlignedButton>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RelationshipLength;
