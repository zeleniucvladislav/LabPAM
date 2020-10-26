import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function ImagesSearch(props) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Search for Unplash Images"
        placeholderTextColor="#eeeeee"
        onChangeText={(value) => setSearchTerm(value)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.fetchImages(searchTerm)}
      >
        <Text style={styles.buttonText}>Search</Text>
        <AntDesign name="search1" style={styles.buttonText} size={18} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00adb5",
    padding: 10,
    width: "30%",
  },
  buttonText: {
    paddingRight: 5,
    color: "#eeeeee",
  },
  input: {
    borderWidth: 1,
    borderColor: "#00adb5",
    padding: 10,
    color: "#eeeeee",
    width: "65%",
  },
});
