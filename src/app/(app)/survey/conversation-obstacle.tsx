import { useRouter } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";

import { useAppTheme } from "../../../hooks/useAppTheme";
import { LeftAlignedButton } from "../../../screens/relationship/leftAlignedButton";
import { useStore } from "../../../screens/survey/useStore";

const options = [
  { text: "いら", value: "いら" },
  { text: "満足している", value: "満足している" },
  { text: "ふつう", value: "ふつう" },
  { text: "不満がある", value: "不満がある" },
  { text: "とても不満がある", value: "とても不満がある" },
];

const ConversationObstacle = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const { setConversationObstacle } = useStore();

  const handlePress = (answer: string) => {
    setConversationObstacle(answer);
    router.push("/survey/self-expression");
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
            会話の課題
          </Text>
          <Text
            style={{
              fontSize: theme.fontStyle.md[1].size,
              fontWeight: theme.fontStyle.md[1].weight,
            }}
          >
            パートナーとの会話について教えてください
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

export default ConversationObstacle;