import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import GeneralStack from "./src/navigation/GeneralStack";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <GeneralStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
    // <RootStack />
  );
}
