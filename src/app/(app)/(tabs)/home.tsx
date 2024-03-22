import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "../../../components/text";
import { PartnersMood } from "../../../screens/(tabs)/home/PartnersMood";
import { YourMood } from "../../../screens/(tabs)/home/YourMood";
import { useAppTheme } from "../../../hooks/useAppTheme";

export default function HomePage() {
  const theme = useAppTheme();

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Omoi</Text>
      </View>

      <View style={{ height: 40 }} />

      <View
        style={{
          gap: 16,
        }}
      >
        <Text
          style={{
            fontSize: theme.fontStyle.xl[1].size,
            fontWeight: theme.fontStyle.xl[1].weight,
          }}
        >
          おはようございます
        </Text>
        <Text>今日の気分を記録して2人の連続投稿を継続しよう🤝</Text>
      </View>

      <View style={{ height: 40 }} />

      {/* <View style={styles.moodsContainer}>
        <YourMood />
        <PartnersMood />
      </View> */}

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
