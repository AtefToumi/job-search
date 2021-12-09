import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth } from "../screens/SignInScreen";
import SignUp from "../screens/SignUpScreen";
import Splash from "../screens/SplashScreen";
import HomeTabs from "../navigation/navigator";
import OfferScreen from "../screens/OfferScreen";
import UserUpdateScreen from "../screens/UserUpdateScreen";

export type RouteParams = {
  Home: undefined;
  UserUpdateScreen: undefined;
  OfferScreen: {
    company: String;
    title: String;
    salary: Number;
    location: String;
    type: String;
    description: String;
    requirements: String;
    logo: String;
  };
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
};
const Stack = createNativeStackNavigator<RouteParams>();
const GeneralStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeTabs}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="UserUpdateScreen"
        component={UserUpdateScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OfferScreen"
        component={OfferScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={Auth}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUp}
      />
    </Stack.Navigator>
  );
};

export default GeneralStack;
