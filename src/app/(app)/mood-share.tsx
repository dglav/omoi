import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { MoodList } from "../../screens/mood-share/MoodList";

export default function MoodSharePage() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={styles.content}>
        <Text style={styles.title}>What's your mood now?</Text>
      </View>

      <MoodList />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    paddingTop: 60,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
