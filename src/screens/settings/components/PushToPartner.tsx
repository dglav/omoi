import { RotateCcw } from "lucide-react-native";

import { SettingsCardButton } from "./settings-card-button";
import { useNotifyPartner } from "../../../hooks/pushNotificationHooks/useNotifyPartner";
import { useAppTheme } from "../../../hooks/useAppTheme";

export const PushToPartner = () => {
  const { mutate: notifyPartner } = useNotifyPartner();

  const theme = useAppTheme();

  return (
    <SettingsCardButton
      text="Press to Send Partner Notification"
      icon={<RotateCcw color={theme.colors.text} size={20} />}
      onPress={async () => {
        notifyPartner({
          title: "Testing partner notification from settings tab...",
          body: "Hooray! It's working!",
        });
      }}
    />
  );
};
