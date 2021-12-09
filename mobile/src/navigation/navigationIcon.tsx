import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../constants/theme";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface NavigationIconProps {
  route: string;
  isFocused: boolean;
}

const NavigationIcon = ({ route, isFocused }: NavigationIconProps) => {
  const renderIcon = (route: string, isFocues: boolean) => {
    switch (route) {
      case "home":
        return isFocues ? (
          <Feather name="home" color={colors.lightWhite} size={28} />
        ) : (
          <Feather name="home" color={colors.lightgray} size={24} />
        );
      case "application":
        return isFocues ? (
          <Feather name="archive" color={colors.lightWhite} size={28} />
        ) : (
          <Feather name="archive" color={colors.lightgray} size={24} />
        );
      case "profile":
        return isFocues ? (
          <Feather name="user" color={colors.lightWhite} size={28} />
        ) : (
          <Feather name="user" color={colors.lightgray} size={24} />
        );
      case "settings":
        return isFocues ? (
          <Feather name="settings" color={colors.lightWhite} size={28} />
        ) : (
          <Feather name="settings" color={colors.lightgray} size={24} />
        );
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

const styles = StyleSheet.create({});

export default NavigationIcon;
