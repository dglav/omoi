import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { PartnersMood } from "../../screens/(tabs)/home/PartnersMood";
import { YourMood } from "../../screens/(tabs)/home/YourMood";

export default function HomePage() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Our Mood</Text>
      </View>

      <View style={styles.moodsContainer}>
        <YourMood />
        <PartnersMood />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
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
  moodsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 60,
  },
});
