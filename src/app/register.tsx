import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const RegisterPage = () => {
  const theme = useTheme();

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Text>Register Page</Text>
      <Link href="/">Open Login</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RegisterPage;
