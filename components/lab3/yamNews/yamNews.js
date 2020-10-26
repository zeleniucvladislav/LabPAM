import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Newsfeed from "./newsfeed";

const NEWS_FEED = "newsFeed";

export default function YamNews() {
  const [news, setNews] = useState({});
  RetrieveData = async () => {
    try {
      const newsFeed = await AsyncStorage.getItem(NEWS_FEED);
      newsFeed !== null ? setNews(JSON.parse(newsFeed)) : StoreNews();
    } catch (error) {
      console.log(error);
    }
  };
  StoreNews = async () => {
    try {
      const RssParse = "https://api.rss2json.com/v1/api.json?rss_url=";
      const Link = "https://news.yam.md/ro/rss";
      fetch(RssParse + Link)
        .then((res) => res.json())
        .then((res) => {
          AsyncStorage.setItem(NEWS_FEED, JSON.stringify(res.items));
          setNews(res.items);
        });
    } catch (error) {
      console.log(error);
    }
  };
  DeleteNews = async () => {
    try {
      await AsyncStorage.removeItem(NEWS_FEED);
      const newsFeed = await AsyncStorage.getItem(NEWS_FEED);
      setNews(newsFeed);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    RetrieveData();
  }, []);

  return (
    <View style={styles.container}>
      <Newsfeed news={news} />
      <View style={styles.newsActionButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            DeleteNews();
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
          <Feather name="x-circle" size={18} color="#eeeeee" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            StoreNews();
          }}
        >
          <Text style={styles.buttonText}>Update</Text>
          <MaterialIcons name="update" size={18} color="#eeeeee" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#222831",
  },
  newsActionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  button: {
    backgroundColor: "#00adb5",
    padding: 10,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#eeeeee",
    paddingRight: 5,
  },
});
