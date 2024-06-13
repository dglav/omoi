import { useGlobalSearchParams, useRouter } from "expo-router";
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
import { HelperText } from "react-native-paper";

import { Button } from "../../../components/button";
import { Text } from "../../../components/text";
import { useUpdateCustomTag } from "../../../hooks/customTagHooks/useUpdateCustomTag";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { useStore } from "../store/TagStore";

const maxTagLength = 8;

export const EditTagScreenNameScreen = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const { id } = useGlobalSearchParams();

  const { name, setName } = useStore(({ name, setName }) => ({
    name,
    setName,
  }));

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(
    Keyboard.isVisible(),
  );

  Keyboard.addListener("keyboardWillShow", () => setIsKeyboardVisible(true));
  Keyboard.addListener("keyboardWillHide", () => setIsKeyboardVisible(false));

  const mutation = useUpdateCustomTag();

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
            <View>
              <View
                style={{
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: theme.fontStyle.xxl[1].size,
                    fontWeight: theme.fontStyle.xxl[1].weight,
                  }}
                >
                  タグの名前
                </Text>

                <Text
                  style={{
                    fontSize: theme.fontStyle.md[1].size,
                    fontWeight: theme.fontStyle.md[1].weight,
                  }}
                >
                  タグの名前を編集できます
                </Text>
              </View>

              <View style={{ height: 56 }} />

              <View
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <TextInput
                  value={name}
                  placeholder="感情を追加（４文字"
                  onChangeText={(newName) => setName(newName)}
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

                {name && name.length > 0 && name.length > maxTagLength && (
                  <HelperText type="error">
                    最大８文字の感情を入力してください
                  </HelperText>
                )}
              </View>
            </View>

            <View>
              <Button
                disabled={
                  !name || name.length === 0 || name.length > maxTagLength
                }
                onPress={() => {
                  if (typeof id === "string" && name) {
                    mutation.mutate({ id, name });
                    router.navigate("/tags");
                  }
                }}
              >
                保存
              </Button>

              {isKeyboardVisible && <View style={{ height: 16 }} />}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
