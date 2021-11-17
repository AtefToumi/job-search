import React, { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth } from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import Splash from "./src/screens/Splash";
import { StoreContext } from "./src/store.context";

const Stack = createNativeStackNavigator();

export default function App() {
  const { authStore } = useContext(StoreContext);
  const authenticated = authStore.isAuthenticated();
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
    </NavigationContainer>
    // <RootStack />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
