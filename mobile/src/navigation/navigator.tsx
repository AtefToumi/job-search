import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

import TabBar from "../components/tab.bar.component";

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName={"home"}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default HomeTabs;
