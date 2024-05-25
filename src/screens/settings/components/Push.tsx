import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { RotateCcw } from "lucide-react-native";
import { useState, useEffect, useRef } from "react";
import { Alert, Platform } from "react-native";

import { SettingsCardButton } from "./settings-card-button";
import { useNotifySelf } from "../../../hooks/pushNotificationHooks/useNotifySelf";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { useUpdateUser } from "../../../hooks/userHooks/useUpdateUser";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!",
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export const Push = () => {
  const [expoPushToken, setExpoPushToken] = useState("");

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const { mutate: updateUser } = useUpdateUser({});

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(async (token) => {
        Alert.alert(token ?? "no token found...");
        if (token) {
          updateUser({ updatedUser: { expoPushToken } });
        }
        setExpoPushToken(token ?? "");
      })
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
