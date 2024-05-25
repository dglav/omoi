import { useLocalSearchParams } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Footer } from "./components/Footer";
import { MessageWindow } from "./components/MessageWindow";
import { useAppTheme } from "../../../hooks/useAppTheme";

export const PostGroupChat = () => {
  const { postGroupId } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const theme = useAppTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ backgroundColor: "white" }}>
          <SafeAreaView
            style={{
              marginBottom: insets.bottom,
              backgroundColor: theme.colors.background,
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "flex-end",
                height: "100%",
              }}
            >
              {typeof postGroupId === "string" && (
                <MessageWindow postGroupId={postGroupId} />
              )}

              <Footer />
            </View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
