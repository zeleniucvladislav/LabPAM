import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import moment from "moment";

export default function EventList(props) {
  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.event}>
      <Text style={styles.eventText}>
        Date : {moment(item.date).format("MMMM Do YYYY")}
      </Text>
      <Text style={styles.eventText}>Event : {item.text}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.deleteEvent(index, item.date)}
      >
        <Feather name="x-circle" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      <Text style={styles.activityText}>All activities</Text>
      <FlatList
        data={props.eventList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00adb5",
    alignItems: "center",
    padding: 10,
    marginTop: 30,
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
  activityText: {
    fontSize: 16,
    paddingTop: 20,
    color: "#eeeeee",
  },
});
