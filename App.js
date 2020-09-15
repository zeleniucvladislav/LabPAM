import React from "react";
import { View, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "./components/homepage";
import Lab1 from "./components/lab1/lab1";
import Lab2 from "./components/lab2/lab2";
import Lab0 from "./components/lab0/lab0";
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#393e46" />
      <NavigationContainer initialRouteName="Home">
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#393e46",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="Home" component={Homepage} />
          <Stack.Screen name="Lab0" component={Lab0} />
          <Stack.Screen name="Lab1" component={Lab1} />
          <Stack.Screen name="Lab2" component={Lab2} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
