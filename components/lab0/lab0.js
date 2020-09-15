import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function Lab0() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.text}>Zeleniuc Vladislav,react native</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },

  text: {
    color: "#eeeeee",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
