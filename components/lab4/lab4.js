import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Images from "./images";
import ProgressBar from "./progressBar";

export default function Lab4() {
  const [images, setImages] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchImages();
    loadingBar();
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
  const loadingBar = (progress = 0) => {
    setLoadingProgress(progress);
    if (progress < 100)
      setTimeout(() => {
        loadingBar(progress + 1);
      }, 50);
    progress === 100 && setLoading(false);
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ProgressBar percentage={loadingProgress} />
      ) : (
        <Images images={images} />
      )}
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
