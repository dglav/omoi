import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogOut, RotateCcw } from "lucide-react-native";
import React from "react";
import { Alert } from "react-native";

import { TitleSubtitleLayout } from "../../../../components/title-subtitle-layout";
import { useAppTheme } from "../../../../hooks/useAppTheme";
import { useSession } from "../../../../providers/SessionProvider";
import { SettingsCard } from "../../../../screens/settings/settings-card";
import { SettingsCardButton } from "../../../../screens/settings/settings-card-button";

const SettingsRoute = () => {
  const theme = useAppTheme();
  const { signOut } = useSession();

  return (
    <TitleSubtitleLayout title="マイページ">
      <SettingsCard title="その他">
        <SettingsCardButton
          icon={<LogOut color={theme.colors.text} size={20} />}
          text="Logout"
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
    </TitleSubtitleLayout>
  );
};

export default SettingsRoute;
