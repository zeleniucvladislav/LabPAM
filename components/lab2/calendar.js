import React from "react";
import { StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";

export default function Calendar(props) {
  return (
    <CalendarList
      style={styles.calendar}
      // Callback which gets executed when visible months change in scroll view. Default = undefined
      /*onVisibleMonthsChange={(months) => {
        console.log("now these months are visible", months);
      }}*/
      onDayPress={(day) => {
        props.selectDate(day);
      }}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={(day) => {
        props.selectDate(day);
      }}
      // Max amount of months allowed to scroll to the past. Default = 50
      pastScrollRange={50}
      // Max amount of months allowed to scroll to the future. Default = 50
      futureScrollRange={50}
      scrollEnabled={true}
      showScrollIndicator={true}
      markedDates={
        Object.keys(props.markedDateList).length > 0
          ? props.markedDateList
          : null
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
  );
}

const styles = StyleSheet.create({
  calendar: {
    height: 320,
    marginTop: 20,
  },
});
