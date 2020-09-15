import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import React, { useState, useEffect, useRef } from "react";
import { Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationLab() {
  //const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  //const responseListener = useRef();

  useEffect(() => {
    /*registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );*/

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );
    /*
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );*/

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      //Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await sendPushNotification();
        }}
      >
        <Text style={styles.buttonText}>Send Notification</Text>
        <MaterialIcons
          style={styles.buttonText}
          name="notifications-active"
          size={18}
        />
      </TouchableOpacity>
    </>
  );
}
async function sendPushNotification(/*expoPushToken*/) {
  await Notifications.scheduleNotificationAsync({
    vibrate: false,
    sound: true,
    content: {
      title: "Pam notification 📬",
      body: "Notification for PAM",
      data: { data: "goes here" },
    },
    trigger: { seconds: 10 },
  });
}

async function registerForPushNotificationsAsync() {
  //let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    //token = (await Notifications.getExpoPushTokenAsync()).data;
    //console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  //return token;
}
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00adb5",
    padding: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "#eeeeee",
    paddingRight: 5,
  },
});