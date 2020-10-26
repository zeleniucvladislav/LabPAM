import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  ScrollView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";

export default function UpdateEvent(props) {
  const [event, setEvent] = useState("");
  const [disabled,setDisabled] = useState(false)
  const handleUpdate = () => {
    props.updateEvent(props.index, props.item.date, event);
    props.return();
    setDisabled(true)
  };
  return (
    <ScrollView>
    <View style={styles.form}>
      <Text style={styles.label}>
        Date : {moment(props.item.date).format("MMMM Do YYYY")}
      </Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder={`${props.item.text}`}
        placeholderTextColor="#eeeeee"
        onChangeText={(value) => setEvent(value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={disabled}>
        <Text style={styles.buttonText}>Update</Text>
        <MaterialIcons style={styles.buttonText} name="update" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={props.return}>
        <Text style={styles.buttonText}>Return</Text>
        <MaterialIcons
          style={styles.buttonText}
          name="settings-backup-restore"
          size={20}
        />
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#00adb5",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#eeeeee",
    paddingRight: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#00adb5",
    padding: 7,
    color: "#eeeeee",
  },
  label: {
    fontSize: 18,
    marginBottom: 30,
    color: "#eeeeee",
  },
});
