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
  const SearchTerm = () => {
    const url = `http://google.com/search?q=${encodeURIComponent(searchTerm)}`;
    try {
      Linking.openURL(url);
    } catch (err) {
      console.log("Error occured", err);
    }
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
      <TouchableOpacity style={styles.button} onPress={SearchTerm}>
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
    color: "#eeeeee",
  },
  label: {
    fontSize: 18,
    marginBottom: 30,
    color: "#eeeeee",
  },
});
