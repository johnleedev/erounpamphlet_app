import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Platform } from "react-native";
import Detail from "./Pamphlet/Detail";
import Profile from "./Pamphlet/Profile";
import Program from "./Pamphlet/Program";
import LocationMap from "./Pamphlet/LocationMap";
import { getStatusBarHeight } from "react-native-status-bar-height";

const Stack = createNativeStackNavigator();

function Navi_Pamphlet() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        contentStyle: Platform.OS === 'android' ? styles.android : styles.ios
      }}
    >
      <Stack.Screen name={"Detail"} component={Detail} />
      <Stack.Screen name={"Profile"} component={Profile} />
      <Stack.Screen name={"Program"} component={Program} />
      <Stack.Screen name={"LocationMap"} component={LocationMap} />
    </Stack.Navigator>
  );
}
export default Navi_Pamphlet;


const styles = StyleSheet.create({
  android: {
    backgroundColor: '#000',
  },
  ios : {
    backgroundColor: '#000',
    paddingTop: getStatusBarHeight()
  },
});


