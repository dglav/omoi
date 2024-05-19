import { Redirect, useRouter } from "expo-router";
import { View, StyleSheet, Text, Image } from "react-native";

import { Button } from "../components/button";
import { useAppTheme } from "../hooks/useAppTheme";
import { useSession } from "../providers/AuthProvider";

export default function IndexScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { session } = useSession();

  if (session) {
    return <Redirect href="/(app)/(tabs)/home" />;
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.primary,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, marginTop: 160, gap: 80 }}>
        <View>
          <Text
            style={{
              color: theme.colors.white,
              fontSize: theme.fontStyle.xxl[1].size,
              fontWeight: theme.fontStyle.xxl[1].weight,
              textAlign: "center",
            }}
          >
            Omoi
          </Text>
          <Text
            style={{
              color: theme.colors.white,
              fontSize: theme.fontStyle.xl[1].size,
              fontWeight: theme.fontStyle.xl[1].weight,
              textAlign: "center",
            }}
          >
            β版
          </Text>
        </View>
        <Image source={require("../../assets/Frame 184_white.png")} />
      </View>
      <View
        style={{
          width: "100%",
          paddingVertical: 24,
          paddingHorizontal: 16,
          gap: 16,
          height: 172,
        }}
      >
        <Button variant="secondary" onPress={() => router.push("/signUp")}>
          新規アカウントを作る
        </Button>
        <Button variant="secondary" onPress={() => router.push("/signIn")}>
          ログインする
        </Button>
      </View>
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
