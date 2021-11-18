import React from "react";
import { StyleSheet, View } from "react-native";

import Feather from "react-native-vector-icons/Feather";

interface NavigationIconProps {
  route: string;
  isFocused: boolean;
}

const NavigationIcon = ({ route, isFocused }: NavigationIconProps) => {
  const renderIcon = (route: string, isFocues: boolean) => {
    switch (route) {
      case "home":
        return isFocues ? (
          <Feather name="home" color="#159c51" size={24} />
        ) : (
          <Feather name="home" color="#159c51" size={20} />
        );
      case "search":
        return isFocues ? (
          <Feather name="search" color="#159c51" size={24} />
        ) : (
          <Feather name="search" color="#159c51" size={20} />
        );
      case "profile":
        return isFocues ? (
          <Feather name="user" color="#159c51" size={24} />
        ) : (
          <Feather name="user" color="#159c51" size={20} />
        );
      case "settings":
        return isFocues ? (
          <Feather name="settings" color="#159c51" size={24} />
        ) : (
          <Feather name="settings" color="#159c51" size={20} />
        );
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

const styles = StyleSheet.create({});

export default NavigationIcon;
