import { StyleSheet, Text, View } from "react-native";

type MoodItemProps = {
  item: string;
};

export default function MoodItem({ item }: MoodItemProps) {
  return (
    <View style={styles.container}>
      <Text>{item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    display: "flex",
    alignItems: "center",
    padding: 16,
  },
});
