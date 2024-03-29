import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  useWindowDimensions,
  TextInput,
  Alert,
} from "react-native";

import { Button } from "../components/button";
import { useAppTheme } from "../hooks/useAppTheme";
import { supabase } from "../services/supabase";
import { IS_FIRST_SIGN_IN } from "../asyncStorageConstants";

export default function LoginScreen() {
  const { width } = useWindowDimensions();
  const theme = useAppTheme();
  const router = useRouter();
  const [userId, setUserId] = useState<string>();
  const [password, setPassword] = useState<string>();

  async function signInWithEmail() {
    if (!userId || !password) {
      Alert.alert("入力に誤りがあります。");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
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
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: theme.colors.background,
      }}
    >
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
          <View
            style={{
              width,
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingHorizontal: 16,
              gap: 46,
            }}
          >
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
                  fontSize: theme.fontStyle.xl[1].size,
                  fontWeight: theme.fontStyle.xl[1].weight,
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
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
