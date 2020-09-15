import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function UserLocation() {
  const [location, setLocation] = useState(null);
  //const [errorMsg, setErrorMsg] = useState(null);

  async function CheckLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    console.log(location);
  }
  /*
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }*/
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          CheckLocation();
        }}
      >
        <Text style={styles.buttonText}>Location</Text>
        <Entypo style={styles.buttonText} name="location" size={18} />
      </TouchableOpacity>
      {location && (
        <View style={styles.locationContainer}>
          <View style={styles.locationData}>
            <FontAwesome5
              style={styles.locationText}
              name="mountain"
              size={18}
            />
            <Text style={styles.locationText}>
              Altitude : {location.coords.altitude.toFixed(2)}
            </Text>
          </View>
          <View style={styles.locationData}>
            <MaterialCommunityIcons
              style={styles.locationText}
              name="latitude"
              size={18}
            />
            <Text style={styles.locationText}>
              Latitude : {location.coords.latitude.toFixed(2)}
            </Text>
          </View>
          <View style={styles.locationData}>
            <MaterialCommunityIcons
              style={styles.locationText}
              name="longitude"
              size={18}
            />
            <Text style={styles.locationText}>
              Longitude : {location.coords.longitude.toFixed(2)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
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
    paddingRight: 10,
    margin: 10,
  },
  locationContainer: {
    backgroundColor: "#393e46",
    padding: 20,
    marginTop: 20,
  },
  locationData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  locationText: {
    color: "#eeeeee",
  },
});
