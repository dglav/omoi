import { StatusBar } from "expo-status-bar";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "../../../components/text";
import { useAppTheme } from "../../../hooks/useAppTheme";

export default function HomePage() {
  const theme = useAppTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          marginVertical: 12,
        }}
      >
        <Text
          style={{
            fontSize: theme.fontStyle.lg[1].size,
            fontWeight: theme.fontStyle.lg[1].weight,
            letterSpacing: 2,
          }}
        >
          Omoi
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 16,
            backgroundColor: "white",
            borderRadius: 50,
          }}
        >
          <Text>あなた</Text>
        </Pressable>

        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 50,
          }}
        >
          <Text>パートナー</Text>
        </Pressable>
      </View>

      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: theme.colors.textLight,
          marginTop: 8,
        }}
      />

      <View style={{ height: 40 }} />

      <View
        style={{
          gap: 16,
        }}
      >
        <Text
          style={{
            fontSize: theme.fontStyle.xl[1].size,
            fontWeight: theme.fontStyle.xl[1].weight,
          }}
        >
          おはようございます
        </Text>
        <Text>今日の気分を記録して2人の連続投稿を継続しよう🤝</Text>
      </View>

      <View style={{ height: 40 }} />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
