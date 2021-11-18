import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();
//@ts-ignore
const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{}}></Stack.Screen>
    </Stack.Navigator>
  );
};
