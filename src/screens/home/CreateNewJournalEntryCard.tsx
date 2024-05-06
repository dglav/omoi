import { useRouter } from "expo-router";
import { View, Text } from "react-native";

import { Button } from "../../components/button";
import { ConditionIcon_80 } from "../../components/condition-icon-80";
import { useAppTheme } from "../../hooks/useAppTheme";

export const CreateNewJournalEntryCard = () => {
  const theme = useAppTheme();
  const router = useRouter();

  return (
    <View
      style={{
        backgroundColor: theme.colors.white,
        width: "100%",
        borderRadius: 16,
        paddingVertical: 24,
        paddingHorizontal: 30,
        gap: 8,
      }}
    >
      <Text
        style={{
          fontSize: theme.fontStyle.sm["3"].size,
          fontWeight: theme.fontStyle.sm["3"].weight,
          width: "100%",
          textAlign: "center",
        }}
      >
        今日のあなた
      </Text>

      <View
        style={{
          paddingVertical: 16,
          flexDirection: "row",
          gap: 12,
        }}
      >
        <ConditionIcon_80 stroke={theme.colors.textLight} />
        <View style={{ display: "flex", gap: 8 }}>
          <Text
            style={{
              fontSize: theme.fontStyle.xl["1"].size,
              fontWeight: theme.fontStyle.xl["1"].weight,
            }}
          >
            未回答
          </Text>
          <Button onPress={() => router.push("/posts/new/condition")}>
            感情ジャーナルする
          </Button>
        </View>
      </View>
    </View>
  );
};
