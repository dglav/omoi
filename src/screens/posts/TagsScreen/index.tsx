import { usePathname, useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { AddTag } from "./components/AddTag";
import { TagList } from "./components/TagList";
import { Button } from "../../../components/button";
import { useAppTheme } from "../../../hooks/useAppTheme";

const JournalTags = () => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        contentContainerStyle={{ flex: 1 }}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            paddingVertical: 16,
          }}
        >
          <View
            style={{
              width,
              gap: 8,
              paddingHorizontal: 16,
              paddingVertical: 16,
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

          <ScrollView
            contentContainerStyle={{
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "100%",
              paddingHorizontal: 16,
            }}
          >
            <TagList />

            <View style={{ height: 12 }} />

            <AddTag />

            <View style={{ height: 16 }} />

            <Button
              onPress={() => router.push(pathname.replace("/tags", "/note"))}
            >
              次へ
            </Button>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default JournalTags;
