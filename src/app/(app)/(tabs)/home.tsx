import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SquarePen } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "../../../components/text";
import { useAppTheme } from "../../../hooks/useAppTheme";

export default function HomePage() {
  const theme = useAppTheme();
  const router = useRouter();

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

      <FAB
        icon={() => <SquarePen color={theme.colors.white} />}
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.primary,
        }}
        onPress={() => {
          router.push("/(app)/new-journal-entry");
        }}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
