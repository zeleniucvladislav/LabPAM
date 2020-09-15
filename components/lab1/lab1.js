import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import TextInputSearch from "./textInputSearch";
import CameraLab from "./camera";
import NotificationLab from "./notification";
import UserLocation from "./userLocation";
import { Entypo } from "@expo/vector-icons";

export default function Lab1() {
  const [camera, setCamera] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {camera ? (
        <CameraLab setCamera={setCamera} />
      ) : (
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <TextInputSearch />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setCamera(true);
              }}
            >
              <Text style={styles.buttonText}>Show Camera</Text>
              <Entypo style={styles.buttonText} name="camera" size={18} />
            </TouchableOpacity>
            <NotificationLab />
            <UserLocation />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
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
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
