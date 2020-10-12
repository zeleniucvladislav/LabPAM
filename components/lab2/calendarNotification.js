import React, { useState, useEffect, useRef } from "react";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import moment from "moment";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function CalendarNotification({ eventList }) {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  useEffect(() => {
    ShowNotification(eventList);
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, [eventList]);

  const ShowNotification = (data) => {
    const event = data.find(
      (el) => el.date === `${moment().format("YYYY-MM-DD")}`.toString()
    );
    data.some(
      (el) => el.date === `${moment().format("YYYY-MM-DD")}`.toString()
    ) && sendPushNotification(event);
  };
  return <></>;
}
async function sendPushNotification(event) {
  await Notifications.scheduleNotificationAsync({
    vibrate: false,
    sound: true,
    content: {
      title: "Calendar Notification",
      body: `You have an outgoing event called ${event.text} at ${moment(
        event.date
      ).format("MMMM Do YYYY")}`,
      data: { data: "goes here" },
    },
    trigger: { seconds: 0 },
  });
}

async function registerForPushNotificationsAsync() {
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
}
