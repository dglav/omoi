import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function LoginPage() {
  const theme = useTheme();

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Link href="/onboarding">Intro</Link>
      <Link href="/home">Login</Link>
      <Link href="/register">Open Register</Link>
      <Link href="/mood-share">Mood Share</Link>
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
