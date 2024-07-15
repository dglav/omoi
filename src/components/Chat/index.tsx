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
import { useAppTheme } from "../../hooks/useAppTheme";
import { Message } from "../../services/supabase/database/post_group_messages/getPostGroupMessages";

type Props = {
  messages: Message[];
  sendNewMessage: ({ message }: { message: string }) => void;
};

export const Chat = ({ messages, sendNewMessage }: Props) => {
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
              <MessageWindow messages={messages} />

              <Footer sendNewMessage={sendNewMessage} />
            </View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
