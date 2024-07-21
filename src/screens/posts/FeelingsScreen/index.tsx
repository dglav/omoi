import { usePathname, useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

import { AddFeeling } from "./components/AddFeeling";
import { FeelingList } from "./components/FeelingList";
import { TitleSection } from "./components/TitleSection";
import { Button } from "../../../components/button";
import { useAppTheme } from "../../../hooks/useAppTheme";

const JournalFeeling = () => {
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
        contentContainerStyle={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            paddingVertical: 16,
          }}
        >
          <View style={{ flex: 1 }}>
            <TitleSection />

            <ScrollView>
              <FeelingList />

              <View style={{ height: 12 }} />

              <AddFeeling />
            </ScrollView>

            <View style={{ height: 16 }} />
          </View>

          <View
            style={{
              width: "100%",
              paddingHorizontal: 16,
            }}
          >
            <Button
              onPress={() =>
                router.push(pathname.replace("/feelings", "/note"))
              }
            >
              次へ
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default JournalFeeling;
