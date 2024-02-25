import { Link } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, Surface, TouchableRipple, useTheme } from "react-native-paper";

export function YourMood() {
  const theme = useTheme();

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Text>You</Text>
      <Link href="/mood-share" asChild>
        <Button mode="contained" contentStyle={{ width: 120, height: 155 }}>
          <View style={{ display: "flex", alignContent: "center" }}>
            <Text
              style={{ color: theme.colors.onPrimary, textAlign: "center" }}
            >
              Share
            </Text>
            <Text
              style={{ color: theme.colors.onPrimary, textAlign: "center" }}
            >
              your
            </Text>
            <Text
              style={{ color: theme.colors.onPrimary, textAlign: "center" }}
            >
              mood!
            </Text>
          </View>
        </Button>
      </Link>
    </View>
  );
}
