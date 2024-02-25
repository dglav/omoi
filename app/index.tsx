import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";

export default function IndexPage() {
  const theme = useTheme();

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Our Mood</Text>
      </View>

      <View>
        <View>
          <Text>You</Text>
          <Link href="/mood-share">
            <Button>
              <Text>Share your Mood!</Text>
            </Button>
          </Link>
        </View>

        <View>
          <Text>Your Partner</Text>
        </View>
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
});
