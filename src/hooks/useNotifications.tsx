import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";

import { useUpdateUser } from "../hooks/userHooks/useUpdateUser";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
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

  if (!Device.isDevice) {
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

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
    console.log({ pushTokenString });
    return pushTokenString;
  } catch (e: unknown) {
    handleRegistrationError(`${e}`);
  }
}

export const useNotifications = () => {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const pushTokenListener = useRef<Notifications.Subscription>();

  const { mutate: updateUser } = useUpdateUser({});

  // registerForPushNotificationsAsync().then(async (token) => {
  //   Alert.alert("registerForPushNotificationsAsync", token);
  //   if (token) {
  //     updateUser({ updatedUser: { expoPushToken: token } });
  //   }
  // });

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    pushTokenListener.current = Notifications.addPushTokenListener((token) => {
      console.log("addPushTokenListener", JSON.stringify(token));
    });

    registerForPushNotificationsAsync().then(async (token) => {
      console.log("registerForPushNotificationsAsync", token);
      if (token) {
        updateUser({ updatedUser: { expoPushToken: token } });
      }
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
      pushTokenListener.current &&
        Notifications.removePushTokenSubscription(pushTokenListener.current);
    };
  }, []);
};
