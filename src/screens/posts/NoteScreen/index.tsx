import { usePathname, useRouter } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Header } from "./Header";
import { Button } from "../../../components/button";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { useStore } from "../store/useStore";

const JournalNote = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const [note, updateNote] = useStore((state) => [
    state.note,
    state.updateNote,
  ]);
  const { feelings, tags } = useStore();
  const pathname = usePathname();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: theme.colors.background,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView>
            <View
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: theme.colors.background,
              }}
            >
              <Header feelings={feelings} tags={tags} />

              <ScrollView
                style={{
                  paddingHorizontal: 16,
                  width: "100%",
                }}
                keyboardDismissMode="none"
              >
                <TextInput
                  multiline
                  value={note}
                  onChangeText={(text) => updateNote(text)}
                  placeholder="詳しく書いてみてください"
                  maxLength={2000}
                  autoFocus
                />
              </ScrollView>

              <View
                style={{
                  width: "100%",
                  padding: 16,
                }}
              >
                <Button
                  onPress={() =>
                    router.push(pathname.replace("/note", "/tags"))}
                >
                  次へ
                </Button>
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default JournalNote;
