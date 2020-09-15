import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function DisplayPhoto(props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: props.photo }} style={styles.image} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.setCapturedPhoto(false)}
      >
        <Text style={styles.buttonText}>
          <AntDesign name="back" size={25} />
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: 500,
    margin: 30,
  },
  button: {
    backgroundColor: "#00adb5",
    alignItems: "center",
    padding: 5,
    marginBottom: 25,
    width: 100,
  },
  buttonText: {
    color: "white",
  },
});
