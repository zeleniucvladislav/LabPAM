import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";

export default function Lab3({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("YamNews")}
      >
        <Text style={styles.buttonText}>YamNews</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Wallhaven Images")}
      >
        <Text style={styles.buttonText}>Wallhaven Images</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#222831",
  },
  button: {
    backgroundColor: "#00adb5",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    margin: 20,
  },
  buttonText: {
    color: "#eeeeee",
  },
});
