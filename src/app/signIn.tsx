import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";

import { Button } from "../components/button";
import { useSignInWithPassword } from "../hooks/authHooks/useSignInWithPassword";
import { useAppTheme } from "../hooks/useAppTheme";

export default function LoginScreen() {
  const { width } = useWindowDimensions();
  const theme = useAppTheme();
  const router = useRouter();
  const [userId, setUserId] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { signInWithPassword } = useSignInWithPassword();

  async function signInWithEmail() {
    if (!userId || !password) {
      Alert.alert("入力に誤りがあります。");
      return;
    }

    const { data, error } = await signInWithPassword({
      email: userId,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    }

    if (data.session) {
      router.push("/(app)/(tabs)/home");
    }
  }

  return (
    <SafeAreaView
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 48 }}>
            <View
              style={{
                width,
                paddingVertical: 16,
                display: "flex",
                justifyContent: "flex-start",
                gap: 16,
              }}
            >
              <Text
                style={{
                  fontSize: theme.fontStyle.xxl[1].size,
                  fontWeight: theme.fontStyle.xxl[1].weight,
                }}
              >
                ログイン
              </Text>

              <Text
                style={{
                  fontSize: theme.fontStyle.md[1].size,
                  fontWeight: theme.fontStyle.md[1].weight,
                }}
              >
                あなたのIDとパスワードを入力してください
              </Text>
            </View>

            <View style={{ height: 46 }} />
            <View
              style={{
                gap: 40,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: theme.fontStyle.md[1].size,
                    fontWeight: theme.fontStyle.md[1].weight,
                  }}
                >
                  ユーザーID
                </Text>
                <View style={{ height: 8 }} />
                <TextInput
                  value={userId}
                  onChangeText={(text) => setUserId(text)}
                  placeholder="tanaka@omoi.com"
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  autoCorrect={false}
                  autoFocus
                  keyboardType="email-address"
                  inputMode="email"
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
                <Text
                  style={{
                    fontSize: theme.fontStyle.md[1].size,
                    fontWeight: theme.fontStyle.md[1].weight,
                  }}
                >
                  パスワード
                </Text>
                <View style={{ height: 8 }} />
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  autoCapitalize="none"
                  placeholder="*******"
                  textContentType="password"
                  autoCorrect={false}
                  secureTextEntry
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

              <View style={{}}>
                <Button onPress={signInWithEmail}>次へ</Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
