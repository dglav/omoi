import React from "react";
import { Text, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSession } from "../../../providers/SessionProvider";
import { supabase } from "../../../services/supabase";

const SettingsRoute = () => {
  const theme = useTheme();
  const { signOut } = useSession();

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Text>Settings</Text>
      <Button onPress={() => signOut()}>Sign Out</Button>
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

export default SettingsRoute;
