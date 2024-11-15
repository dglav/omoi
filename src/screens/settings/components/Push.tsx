import { RotateCcw } from "lucide-react-native";

import { SettingsCardButton } from "./settings-card-button";
import { useNotifySelf } from "../../../hooks/pushNotificationHooks/useNotifySelf";
import { useAppTheme } from "../../../hooks/useAppTheme";

export const Push = () => {
  const { mutate: notifySelf } = useNotifySelf();

  const theme = useAppTheme();

  return (
    <SettingsCardButton
      text="Press to Send Notification"
      icon={<RotateCcw color={theme.colors.text} size={20} />}
      onPress={async () => {
        notifySelf({
          title: "Testing from settings tab...",
          body: "Hooray! It's working!",
        });
      }}
    />
  );
};
