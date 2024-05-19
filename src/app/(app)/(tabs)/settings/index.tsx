import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LogOut, RotateCcw, User } from "lucide-react-native";
import React from "react";
import { Alert, View, Text } from "react-native";

import { ScreenContainer } from "../../../../components/screen-container";
import { useSignOut } from "../../../../hooks/authHooks/useSignOut";
import { useAppTheme } from "../../../../hooks/useAppTheme";
import { SettingsCard } from "../../../../screens/settings/settings-card";
import { SettingsCardButton } from "../../../../screens/settings/settings-card-button";

const SettingsRoute = () => {
  const theme = useAppTheme();
  const { signOut } = useSignOut();
  const router = useRouter();

  return (
    <ScreenContainer>
      <View
        style={{
          gap: 16,
          paddingHorizontal: 16,
          paddingTop: 24,
        }}
      >
        <Text
          style={{
            fontSize: theme.fontStyle.xl[1].size,
            fontWeight: theme.fontStyle.xl[1].weight,
          }}
        >
          マイページ
        </Text>

        <SettingsCard title="アカウント設定">
          <SettingsCardButton
            icon={<User color={theme.colors.text} size={20} />}
            text="ニックネーム変更"
            onPress={() => {
              router.push("/settings/nickname");
            }}
          />
        </SettingsCard>

        <SettingsCard title="その他">
          <SettingsCardButton
            icon={<LogOut color={theme.colors.text} size={20} />}
            text="ログアウト"
            onPress={() => {
              signOut();
            }}
          />

          <SettingsCardButton
            icon={<RotateCcw color={theme.colors.text} size={20} />}
            text="Reset Async Storage"
            onPress={() => {
              AsyncStorage.clear();
              Alert.alert("async storage has been reset!");
            }}
          />
        </SettingsCard>
      </View>
    </ScreenContainer>
  );
};

export default SettingsRoute;
