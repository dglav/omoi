import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const AnalysisRoute = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Text>Analysis</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AnalysisRoute;
