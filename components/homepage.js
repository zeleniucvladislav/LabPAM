import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

export default function Homepage({ navigation }) {
  return (
    <View style={styles.body}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Lab0")}
      >
        <Text style={styles.buttonText}>Laboratorul 0</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Lab1")}
      >
        <Text style={styles.buttonText}>Laboratorul 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Lab2")}
      >
        <Text style={styles.buttonText}>Laboratorul 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Lab3")}
      >
        <Text style={styles.buttonText}>Laboratorul 3</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 50,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#222831",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#00adb5",
    alignItems: "center",
    padding: 15,
  },
  buttonText: {
    color: "#eeeeee",
  },
});
