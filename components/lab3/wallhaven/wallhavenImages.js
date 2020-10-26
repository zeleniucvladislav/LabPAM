import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Images from "./images";
import ImagesSearch from "./imagesSearch";

export default function WallHavenImages() {
  const [images, setImages] = useState({});
  useEffect(() => {
    fetchImages();
  }, []);
  const fetchImages = (search = "sport") => {
    try {
      const url = `https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(
        search
      )}`;
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setImages(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ImagesSearch fetchImages={fetchImages} />
      <Images images={images} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#222831",
  },
});
