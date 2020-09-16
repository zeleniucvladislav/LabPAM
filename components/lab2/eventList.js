import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import UpdateEvent from "./updateEvent";

export default function EventList(props) {
  var arrayHolder = props.eventList;
  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [item, setItem] = useState({});
  const [index, setIndex] = useState("");
  useEffect(() => {
    setList(props.eventList);
  }, [props.eventList]);
  const handleSearch = (text) => {
    const newData = arrayHolder.filter((item) => {
      const itemData = `${item.date.toUpperCase()} ${item.text.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setList(newData);
  };
  const selectedItem = (index, item) => {
    setItem(item);
    setIndex(index);
    setUpdate(true);
  };
  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.event}>
      <Text style={styles.eventText}>
        Date : {moment(item.date).format("MMMM Do YYYY")}
      </Text>
      <Text style={styles.eventText}>Event : {item.text}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => selectedItem(index, item)}
        >
          <MaterialIcons name="update" size={30} color="#eeeeee" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.deleteEvent(index, item.date)}
        >
          <Feather name="x-circle" size={30} color="#eeeeee" />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <>
      {update ? (
        <UpdateEvent
          updateEvent={props.updateEvent}
          return={() => setUpdate(false)}
          item={item}
          index={index}
        />
      ) : (
        <>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Search desired activity"
            onChangeText={(text) => handleSearch(text)}
          />
          <FlatList
            data={list.sort((a, b) => a.date.localeCompare(b.date))}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#00adb5",
    alignItems: "center",
    padding: 10,
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
  input: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#00adb5",
    padding: 10,
    color: "#eeeeee",
  },
});
