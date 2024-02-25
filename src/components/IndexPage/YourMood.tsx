import { Link } from "expo-router";
import { View } from "react-native";
import { Button, useTheme, Text } from "react-native-paper";

import { useAlignmentResetForMultiLineButton } from "./useAlignmentResetForMultiLineButton";

export function YourMood() {
  const theme = useTheme();
  const labelStyle = useAlignmentResetForMultiLineButton();

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
        <Button
          mode="contained"
          contentStyle={{
            width: 120,
            height: 155,
          }}
          labelStyle={labelStyle}
        >
          <View>
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
