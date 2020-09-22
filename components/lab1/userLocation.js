import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function UserLocation() {
  const [location, setLocation] = useState(null);
  async function CheckLocation() {
    try {
      let { status } = await Location.requestPermissionsAsync();
      status !== "granted" &&
        setErrorMsg("Permission to access location was denied");
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      console.log("Notification error", error);
    }
  }
  const LocationData = ({ iconName, locationText, locationNumber }) => {
    return (
      <View style={styles.locationData}>
        <MaterialCommunityIcons
          style={styles.locationText}
          name={iconName}
          size={18}
        />
        <Text style={styles.locationText}>
          {locationText} : {locationNumber.toFixed(2)}
        </Text>
      </View>
    );
  };
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
          <LocationData
            iconName="altimeter"
            locationText="Altitude"
            locationNumber={location.coords.altitude}
          />
          <LocationData
            iconName="latitude"
            locationText="Latitude"
            locationNumber={location.coords.latitude}
          />
          <LocationData
            iconName="longitude"
            locationText="Longitude"
            locationNumber={location.coords.longitude}
          />
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
    paddingRight: 5,
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
    paddingRight: 5,
    margin: 10,
  },
});
