import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Linking,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";

export default function Images(props) {
  const ImageDownload = (url) => {
    try {
      Linking.openURL(url);
    } catch (err) {
      console.log("Error occured", err);
    }
  };
  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.imageContainer}>
      <Image source={{ uri: item.thumbs.small }} style={styles.image} />
      <View style={styles.imageData}>
        <Text style={styles.imageDateText}>
          {moment(item.created_at).format("MMMM Do YYYY")}
        </Text>
        <View style={styles.imageView}>
          <Entypo name="eye" size={20} color="#eeeeee" />
          <Text style={styles.imageViewText}>{item.views}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => ImageDownload(item.path)}
      >
        <Text style={styles.buttonText}>Check Original</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <FlatList
      data={props.images}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    margin: 10,
    padding: 20,
    backgroundColor: "#393e46",
  },
  imageData: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 190,
    marginBottom: 10,
    marginTop: 10,
  },
  imageDateText: {
    color: "#eeeeee",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  imageView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  imageViewText: {
    color: "#eeeeee",
    fontSize: 18,
    paddingLeft: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00adb5",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    paddingRight: 5,
    color: "#eeeeee",
  },
});
