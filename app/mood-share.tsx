import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

const moods = [
  "happy",
  "thankful",
  "interesting",
  "fun",
  "delightful",
  "lovely",
];

export default function HomePage() {
  const theme = useTheme();

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.content}>
        <Text style={styles.title}>What's your mood now?</Text>
      </View>

      <FlatList
        data={moods}
        renderItem={({ item }) => (
          <View style={styles.moodContainer}>
            <Text>{item}</Text>
          </View>
        )}
        horizontal={false}
        numColumns={3}
        style={styles.moodsContainer}
      />

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
  moodsContainer: {
    padding: 20,
  },
  moodContainer: {
    width: 100,
    display: "flex",
    alignItems: "center",
    padding: 16,
  },
});
