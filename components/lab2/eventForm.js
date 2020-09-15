import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";

export default function EventForm(props) {
  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.event}>
      <Text style={styles.eventText}>
        Date : {moment(item.date).format("MMMM Do YYYY")}
      </Text>
      <Text style={styles.eventText}>Event : {item.text}</Text>
    </View>
  );
  return (
    <View style={styles.form}>
      <Text style={styles.label}>
        Date : {moment(props.date).format("MMMM Do YYYY")}
      </Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Type some activity"
        onChangeText={(value) => props.setText(value)}
      />
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.setCalendarExpanded(false);
        }}
      >
        <Text style={styles.buttonText}>
          <AntDesign name="back" size={25} />
        </Text>
      </TouchableOpacity>
      <View style={styles.eventContainer}>
        <FlatList
          data={props.dateEvents}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#00adb5",
    alignItems: "center",
    padding: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "#eeeeee",
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
  eventContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  event: {
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#00adb5",
  },
  eventText: {
    color: "#eeeeee",
  },
});
