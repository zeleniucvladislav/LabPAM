import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function TextInputSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const onPress = () => {
    const url = `http://google.com/search?q=${searchTerm}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };
  return (
    <>
      <Text style={styles.label}>Enter google search term : </Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="e.g React Native"
        onChangeText={(value) => setSearchTerm(value)}
      />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Search Term</Text>
        <AntDesign name="search1" style={styles.buttonText} size={18} />
      </TouchableOpacity>
    </>
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
  input: {
    borderWidth: 1,
    borderColor: "#00adb5",
    padding: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 30,
    color: "#eeeeee",
  },
});