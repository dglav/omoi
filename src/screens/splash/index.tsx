import { View, StyleSheet, Text, Image } from "react-native";

import { useAppTheme } from "../../hooks/useAppTheme";

export default function SplashScreen() {
  const theme = useAppTheme();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.primary,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, marginTop: 160, gap: 80 }}>
        <View>
          <Text
            style={{
              color: theme.colors.white,
              fontSize: theme.fontStyle.xxl[1].size,
              fontWeight: theme.fontStyle.xxl[1].weight,
              textAlign: "center",
            }}
          >
            Omoi
          </Text>
          <Text
            style={{
              color: theme.colors.white,
              fontSize: theme.fontStyle.xl[1].size,
              fontWeight: theme.fontStyle.xl[1].weight,
              textAlign: "center",
            }}
          >
            β版
          </Text>
        </View>
        <Image source={require("../../../assets/Frame 184_white.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
