import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { AlarmClock, Bell, LogOut, RotateCcw, User } from "lucide-react-native";
import React from "react";
import { Alert, View, Text, ScrollView } from "react-native";

import { Push } from "./components/Push";
import { SettingsCard } from "./components/settings-card";
import { SettingsCardButton } from "./components/settings-card-button";
import { ScreenContainer } from "../../components/screen-container";
import { useSignOut } from "../../hooks/authHooks/useSignOut";
import { useAppTheme } from "../../hooks/useAppTheme";
import { PushToPartner } from "./components/PushToPartner";
// import { isDevelopmentMode } from "../../utils/isDevelopmentMode";

const SettingsScreen = () => {
  const theme = useAppTheme();
  const { signOut } = useSignOut();
  const router = useRouter();

  return (
    <ScreenContainer>
      <ScrollView>
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
            {/* <SettingsCardButton
            icon={<HeartHandshake color={theme.colors.text} size={20} />}
            text="ペアリング設定"
            onPress={() => {
              router.push("/settings/pair-settings");
            }}
          /> */}
            <SettingsCardButton
              icon={<User color={theme.colors.text} size={20} />}
              text="カラーテーマ"
              onPress={() => {
                router.push("/settings/color");
              }}
            />
          </SettingsCard>

          <SettingsCard title="通知設定">
            {/* <SettingsCardButton
              icon={<Bell color={theme.colors.text} size={20} />}
              text="通知設定"
              onPress={() => {
                router.push("/settings/reminders");
              }}
            /> */}
            <SettingsCardButton
              icon={<AlarmClock color={theme.colors.text} size={20} />}
              text="リマインダー設定"
              onPress={() => {
                router.push("/settings/reminders");
              }}
            />
          </SettingsCard>

          {/* <SettingsCard title="ヘルプ">
          <SettingsCardButton
            icon={<HelpCircle color={theme.colors.text} size={20} />}
            text="お問い合わせ"
            onPress={() => {
              Alert.alert("未実装");
            }}
          />
        </SettingsCard> */}

          <SettingsCard title="その他">
            <SettingsCardButton
              icon={<LogOut color={theme.colors.text} size={20} />}
              text="ログアウト"
              onPress={() => {
                signOut();
              }}
            />
          </SettingsCard>

          {/* {isDevelopmentMode && ( */}
          <SettingsCard title="開発者設定">
            <SettingsCardButton
              icon={<RotateCcw color={theme.colors.text} size={20} />}
              text="Reset Async Storage"
              onPress={() => {
                AsyncStorage.clear();
                Alert.alert("async storage has been reset!");
              }}
            />

            <Push />

            <PushToPartner />
          </SettingsCard>
          {/* )} */}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default SettingsScreen;
