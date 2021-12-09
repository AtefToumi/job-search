import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActiveScreen from "../screens/ActiveApplicationsScreen";
import InactiveScreen from "../screens/InactiveApplicationsScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/theme";

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="ActiveScreen"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.green,
          marginTop: insets.top,
          elevation: 10,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.7,
          shadowRadius: 5,
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.lightBlack,
        tabBarIndicatorStyle: { backgroundColor: colors.white },
      }}
    >
      <Tab.Screen
        name="ActiveScreen"
        component={ActiveScreen}
        options={{
          tabBarLabel: "Active Applications",
        }}
      />
      <Tab.Screen
        name="InactiveScreen"
        component={InactiveScreen}
        options={{ tabBarLabel: "Applications" }}
      />
    </Tab.Navigator>
  );
}
