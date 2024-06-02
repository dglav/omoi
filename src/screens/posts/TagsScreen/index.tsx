import { usePathname, useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

import { AddTag } from "./components/AddTag";
import { TagList } from "./components/TagList";
import { TitleSection } from "./components/TitleSection";
import { Button } from "../../../components/button";
import { useAppTheme } from "../../../hooks/useAppTheme";

const JournalTags = () => {
  const theme = useAppTheme();
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
          <TitleSection />

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
