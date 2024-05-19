import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";

import { Button } from "../components/button";
import { TitleSubtitleLayout } from "../components/title-subtitle-layout";
import { useAppTheme } from "../hooks/useAppTheme";
import { useSignUp } from "../hooks/useSignUp";
import { AuthError } from "../utils/errors";

export default function SignUpScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const { signUp } = useSignUp();

  async function signUpWithEmail(
    userId: string,
    password: string,
    passwordConfirm: string,
  ) {
    if (
      !userId ||
      !password ||
      !passwordConfirm ||
      password !== passwordConfirm
    ) {
      Alert.alert("入力データに誤りがあります。");
      return;
    }

    try {
      const { data } = await signUp({ email: userId, password });

      if (!data.session) {
        Alert.alert("Please check your inbox for email verification!");
      }

      if (data.session) {
        router.push("/home");
      }
    } catch (error) {
      if (error instanceof AuthError) {
        Alert.alert("Authentication Error", error.message);
      } else if (error instanceof Error) {
        Alert.alert("Authentication Error", error.message);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <TitleSubtitleLayout
      title="アカウント作成"
      subtitle="メールアドレスとパスワードを登録してください"
    >
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
            secureTextEntry
            autoCorrect={false}
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
            パスワード（確認）
          </Text>
          <View style={{ height: 8 }} />
          <TextInput
            value={passwordConfirm}
            onChangeText={(text) => setPasswordConfirm(text)}
            autoCapitalize="none"
            placeholder="*******"
            textContentType="password"
            secureTextEntry
            autoCorrect={false}
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
          <Button
            onPress={() => signUpWithEmail(userId, password, passwordConfirm)}
          >
            次へ
          </Button>
        </View>
      </View>
    </TitleSubtitleLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
