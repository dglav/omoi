import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import PartnersMood from "../components/index/PartnersMood";
import YourMood from "../components/index/YourMood";

export default function IndexPage() {
  const theme = useTheme();

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Our Mood</Text>
      </View>

      <View style={styles.moodsView}>
        <YourMood />
        <PartnersMood />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    paddingTop: 32,
  },
  headerText: {
    fontWeight: "bold",
  },
  moodsView: {
    display: "flex",
    justifyContent: "space-between",
  },
});
