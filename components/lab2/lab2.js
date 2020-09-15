import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { CalendarList } from "react-native-calendars";
//import { AsyncStorage } from "react-native";

import EventList from "./eventList";

export default function Lab2() {
  const [date, setDate] = useState("");
  const [markedDate, setMarkedDate] = useState({
    markedDate: {
      selected: true,
      marked: true,
      selectedColor: "blue",
    },
  });
  const [markedDateList, setMarkedDateList] = useState([]);
  const [text, setText] = useState("");
  const [event, setEvent] = useState({ date: "", text: "" });
  const [eventList, setEventList] = useState([]);
  const [dateEvents, setDateEvents] = useState([]);
  const [calendarExpanded, setCalendarExpanded] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (!update) {
      setEventList(eventList);
      setMarkedDateList(markedDateList);
      console.log(Object.keys(markedDateList).length);
    } else {
      setEventList(eventList);
      setMarkedDateList(markedDateList);
      setUpdate(false);
      console.log(Object.keys(markedDateList).length);
    }
  }, [update, markedDateList, eventList]);
  /*
  StoreData = async () => {
    try {
      await AsyncStorage.setItem("EventList", eventList);
    } catch (error) {
      console.log(error);
    }
  };
  RetrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("EventList");
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };*/

  const selectDate = (day) => {
    setDate(day.dateString);
    setMarkedDate({
      [day.dateString]: {
        selected: true,
        marked: true,
        selectedColor: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
      },
    });
    setDateEvents(eventList.filter((value) => value.date === day.dateString));
    setCalendarExpanded(true);
  };
  const onPress = () => {
    var temp = markedDateList;
    setEvent({ date, text });
    setEventList(eventList.concat({ date, text }));
    setMarkedDateList(Object.assign({}, temp, markedDate));
    setCalendarExpanded(false);
  };
  const deleteEvent = (index, date) => {
    eventList.splice(index, 1);
    delete markedDateList[date];
    setUpdate(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
          {calendarExpanded ? (
            <View style={styles.form}>
              <Text style={styles.label}>
                Date : {moment(date).format("MMMM Do YYYY")}
              </Text>
              <TextInput
                style={styles.input}
                multiline
                placeholder="Type some activity"
                onChangeText={(value) => setText(value)}
              />
              <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Create Event</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setCalendarExpanded(false);
                }}
              >
                <Text style={styles.buttonText}>
                  <AntDesign name="back" size={25} />
                </Text>
              </TouchableOpacity>
              <View style={styles.eventContainer}>
                {dateEvents.map((item, index) => {
                  return (
                    <View key={index} style={styles.event}>
                      <Text style={styles.eventText}>
                        Date : {moment(item.date).format("MMMM Do YYYY")}
                      </Text>
                      <Text style={styles.eventText}>Event : {item.text}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : (
            <>
              <CalendarList
                style={styles.calendar}
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) => {
                  console.log("now these months are visible", months);
                }}
                onDayPress={(day) => {
                  selectDate(day);
                }}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day) => {
                  selectDate(day);
                }}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                scrollEnabled={true}
                showScrollIndicator={true}
                markedDates={
                  Object.keys(markedDateList).length > 0 ? markedDateList : null
                }
                theme={{
                  backgroundColor: "#393e46",
                  calendarBackground: "#393e46",
                  textSectionTitleColor: "#00adb5",
                  textSectionTitleDisabledColor: "#eeeeee",
                  selectedDayBackgroundColor: "#00adb5",
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: "#00adb5",
                  dayTextColor: "#eeeeee",
                  textDisabledColor: "#d9e1e8",
                  dotColor: "#00adb5",
                  selectedDotColor: "#ffffff",
                  monthTextColor: "#eeeeee",
                  indicatorColor: "#eeeeee",
                }}
              />
              <EventList eventList={eventList} deleteEvent={deleteEvent} />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#222831",
  },
  body: {
    flex: 1,
  },
  calendar: {
    height: 350,
    marginTop: 30,
  },
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  event: {
    flex: 1,
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
