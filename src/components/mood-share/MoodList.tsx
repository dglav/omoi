import { FlatList, StyleSheet } from "react-native";

import MoodItem from "./MoodItem";

const moods = [
  "happy",
  "thankful",
  "interesting",
  "fun",
  "delightful",
  "lovely",
];

export default function MoodList() {
  return (
    <FlatList
      data={moods}
      renderItem={({ item }) => <MoodItem item={item} />}
      horizontal={false}
      numColumns={3}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
