import React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as theme from "../constants/theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import Moment from "react-moment";
import { Menu, Pressable } from "native-base";
import Feather from "react-native-vector-icons/Feather";

//@ts-ignore
export default function Skills({ item }) {
  return (
    <View style={styles.container}>
      <View>
        <Icon
          name="keyboard-arrow-right"
          size={20}
          color={theme.colors.black}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
          width: "85%",
        }}
      >
        <Text style={styles.primaryText}>{item.title}</Text>
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
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  bodyContainer: {
    marginLeft: 10,
    justifyContent: "space-between",
    width: "80%",
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
