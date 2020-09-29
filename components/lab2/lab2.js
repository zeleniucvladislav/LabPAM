import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import EventList from "./eventList";
import Calendar from "./calendar";
import EventForm from "./eventForm";

const MARKED_DATE_LIST = "markedDateList";
const EVENT_LIST = "eventList";

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
  const [calendarExpanded, setCalendarExpanded] = useState(false);

  useEffect(() => {
    RetrieveData();
  }, []);

  const selectDate = (day) => {
    setDate(day.dateString);
    setMarkedDate({
      [day.dateString]: {
        selected: true,
        marked: true,
        selectedColor: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
      },
    });
    setCalendarExpanded(true);
  };

  const createEvent = () => {
    var temp = markedDateList;
    setEvent({ date, text });
    StoreEventList(eventList.concat({ date, text }));
    StoreMarkedDateList(Object.assign({}, temp, markedDate));
    RetrieveData();
    setCalendarExpanded(false);
  };

  const deleteEvent = (index, date) => {
    eventList.splice(index, 1);
    delete markedDateList[date];
    StoreEventList(eventList);
    StoreMarkedDateList(markedDateList);
    RetrieveData();
  };

  const updateEvent = (index, date, text) => {
    eventList[index] = { date, text };
    StoreEventList(eventList);
    RetrieveData();
  };

  StoreEventList = async (object) => {
    try {
      await AsyncStorage.setItem(EVENT_LIST, JSON.stringify(object));
    } catch (error) {
      console.log(error);
    }
  };
  StoreMarkedDateList = async (object) => {
    try {
      await AsyncStorage.setItem(MARKED_DATE_LIST, JSON.stringify(object));
    } catch (error) {
      console.log(error);
    }
  };
  RetrieveData = async () => {
    try {
      const eventList = await AsyncStorage.getItem(EVENT_LIST);
      if (eventList !== null) {
        setEventList(JSON.parse(eventList));
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const markedDateList = await AsyncStorage.getItem(MARKED_DATE_LIST);
      if (markedDateList !== null) {
        setMarkedDateList(JSON.parse(markedDateList));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        {calendarExpanded ? (
          <EventForm
            date={date}
            dateEvents={eventList.filter((value) => value.date === date)}
            setText={setText}
            onPress={createEvent}
            setCalendarExpanded={setCalendarExpanded}
          />
        ) : (
          <>
            <Calendar markedDateList={markedDateList} selectDate={selectDate} />
            <EventList
              eventList={eventList}
              deleteEvent={deleteEvent}
              updateEvent={updateEvent}
            />
          </>
        )}
      </View>
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
});
