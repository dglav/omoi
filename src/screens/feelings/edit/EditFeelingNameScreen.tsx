import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Button } from "../../../components/button";
import { Text } from "../../../components/text";
import { useAppTheme } from "../../../hooks/useAppTheme";

export const EditFeelingScreenNameScreen = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(
    Keyboard.isVisible(),
  );

  Keyboard.addListener("keyboardWillShow", () => setIsKeyboardVisible(true));
  Keyboard.addListener("keyboardWillHide", () => setIsKeyboardVisible(false));

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        display: "flex",
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              paddingTop: 56,
              paddingHorizontal: 16,
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                gap: 16,
                // marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: theme.fontStyle.xxl[1].size,
                  fontWeight: theme.fontStyle.xxl[1].weight,
                }}
              >
                感情の名前
              </Text>

              <Text
                style={{
                  fontSize: theme.fontStyle.md[1].size,
                  fontWeight: theme.fontStyle.md[1].weight,
                }}
              >
                感情の名前を編集できます
              </Text>

              <View style={{ height: 56 }} />

              <TextInput
                value={"だいすき"}
                // onChangeText={(text) => setUserId(text)}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                style={{
                  backgroundColor: theme.colors.white,
                  fontSize: theme.fontStyle.md[3].size,
                  fontWeight: theme.fontStyle.md[3].weight,
                  paddingHorizontal: 16,
                  paddingVertical: 17.5,
                  borderRadius: 8,
                }}
              />
            </View>

            <View>
              <Button
                onPress={() =>
                  router.push(`feelings/${params.id}/feeling-level`)
                }
              >
                次へ
              </Button>

              {isKeyboardVisible && <View style={{ height: 16 }} />}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
