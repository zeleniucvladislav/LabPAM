import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function ProgressBar(props) {
  return (
    <View style={styles.progressBarWrapper}>
      <View style={styles.progressBar}>
        <View
          style={{
            backgroundColor: "#00adb5",
            height: "100%",
            width: `${props.percentage}%`,
          }}
        />
      </View>
      <Text style={styles.progressText}>{props.percentage} % </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  progressBarWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  progressBar: {
    height: 40,
    width: 250,
    borderWidth: 1,
    borderColor: "#393e46",
  },
  progressText: {
    paddingTop: 10,
    fontSize: 16,
    color: "#eeeeee",
  },
});
