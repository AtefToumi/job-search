import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import GeneralStack from "./src/navigation/GeneralStack";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./src/navigation/navigator";

// export default function App() {
//   return (
//     <NavigationContainer>
//       <GeneralStack />
//     </NavigationContainer>
//     // <RootStack />
//   );
// }

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"HomeTabs"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
