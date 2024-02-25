import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

import { MoodList } from "../components/MoodSharePage/MoodList";

export default function HomePage() {
  const theme = useTheme();

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.content}>
        <Text style={styles.title}>What's your mood now?</Text>
      </View>

      <MoodList />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    paddingTop: 84,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
