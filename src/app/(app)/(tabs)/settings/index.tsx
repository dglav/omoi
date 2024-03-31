import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LogOut, RotateCcw, User } from "lucide-react-native";
import React from "react";
import { Alert, View } from "react-native";

import { TitleSubtitleLayout } from "../../../../components/title-subtitle-layout";
import { useAppTheme } from "../../../../hooks/useAppTheme";
import { useSession } from "../../../../providers/SessionProvider";
import { SettingsCard } from "../../../../screens/settings/settings-card";
import { SettingsCardButton } from "../../../../screens/settings/settings-card-button";

const SettingsRoute = () => {
  const theme = useAppTheme();
  const { signOut } = useSession();
  const router = useRouter();

  return (
    <TitleSubtitleLayout title="マイページ">
      <View
        style={{
          gap: 16,
        }}
      >
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
    </TitleSubtitleLayout>
  );
};

export default SettingsRoute;
