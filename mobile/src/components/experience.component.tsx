import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as theme from "../constants/theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import Moment from "react-moment";
import { Menu, Pressable } from "native-base";
import Feather from "react-native-vector-icons/Feather";

//@ts-ignore
export default function Experience({ item }) {
  return (
    <View style={styles.container}>
      <View>
        <Icon
          name="keyboard-arrow-right"
          size={20}
          color={theme.colors.black}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.primaryText}>{item.role}</Text>
        <Text style={styles.primaryText}>{item.company}</Text>
        <Text style={styles.primaryText}>{item.description}</Text>
        <Text style={styles.secondText}>
          <Moment style={{ color: "#000" }} format="MMMM / YYYY" element={Text}>
            {item.startDate}
          </Moment>
          -
          <Moment style={{ color: "#000" }} format="MMMM / YYYY" element={Text}>
            {item.endDate}
          </Moment>
        </Text>
      </View>
      <View style={{ alignSelf: "baseline" }}>
        <Menu
          trigger={(triggerProps) => {
            return (
              <Pressable {...triggerProps}>
                <Feather name="more-vertical" color="black" size={20} />
              </Pressable>
            );
          }}
        >
          <Menu.Item>Delete</Menu.Item>
          <Menu.Item>Edit</Menu.Item>
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  bodyContainer: {
    marginLeft: 10,
    justifyContent: "space-between",
    width: "85%",
  },
  primaryText: {
    lineHeight: 30,
    fontSize: theme.sizes.h3,
    color: theme.colors.black,
  },
  secondText: {
    lineHeight: 30,
    color: theme.colors.gray,
  },
});
