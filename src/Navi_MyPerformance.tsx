import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPerformance from "./MyPerformance/MyPerformanceMain";

const Stack = createNativeStackNavigator();

function Navi_Performance () {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
     >
      <Stack.Screen name={'MyPerformance'} component={MyPerformance}/>
    </Stack.Navigator>
  );
}
export default Navi_Performance;