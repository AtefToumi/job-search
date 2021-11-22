import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth } from "../screens/SignInScreen";
import SignUp from "../screens/SignUpScreen";
import Splash from "../screens/SplashScreen";
import Home from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();
const GeneralStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={Auth}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={Splash}
      />

      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUp}
      /> */}
    </Stack.Navigator>
  );
};

export default GeneralStack;
