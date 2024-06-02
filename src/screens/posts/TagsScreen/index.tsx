import { usePathname, useRouter } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
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
        contentContainerStyle={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: theme.colors.background,
              paddingVertical: 16,
            }}
          >
            <View
              style={{
                width,
                gap: 8,
                paddingHorizontal: 28,
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
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <TagList />

              <View style={{ height: 24 }} />

              <AddTag />
            </ScrollView>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 16,
              }}
            >
              <Button
                onPress={() => router.push(pathname.replace("/tags", "/note"))}
              >
                次へ
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default JournalTags;
