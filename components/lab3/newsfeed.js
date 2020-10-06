import React from "react";
import { View, StyleSheet, FlatList, Text, Linking } from "react-native";
import moment from "moment";

export default function Newsfeed(props) {
  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.event}>
      <Text
        style={styles.eventTitle}
        onPress={() => {
          Linking.openURL(item.link);
        }}
      >
        {item.title}
      </Text>
      <Text style={styles.eventText}>{item.description}</Text>
      <Text style={styles.eventText}>{item.author}</Text>
      <Text style={styles.eventText}>
        {moment(item.pubDate).format("MMMM Do YYYY, H:mm")}
      </Text>
    </View>
  );
  return (
    <FlatList
      data={props.news}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
const styles = StyleSheet.create({
  event: {
    margin: 20,
    padding: 20,
    backgroundColor: "#00adb5",
  },
  eventTitle: {
    color: "#eeeeee",
    fontSize: 17,
    fontWeight: "700",
  },
  eventText: {
    paddingTop: 10,
    lineHeight: 18,
    color: "#eeeeee",
  },
});
