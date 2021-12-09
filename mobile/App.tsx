import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import GeneralStack from "./src/navigation/GeneralStack";

import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <GeneralStack />
      </NavigationContainer>
    </SafeAreaProvider>
    // <RootStack />
  );
}
