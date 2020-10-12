import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Newsfeed from "./newsfeed";

const NEWS_FEED = "newsFeed";

export default function Lab3() {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            DeleteNews();
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            StoreNews();
          }}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <Newsfeed news={news} />
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
  button: {
    backgroundColor: "#00adb5",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    margin: 20,
  },
  buttonText: {
    color: "#eeeeee",
  },
});
