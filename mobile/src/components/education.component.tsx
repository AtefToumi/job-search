import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as theme from "../constants/theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import Moment from "react-moment";

//@ts-ignore
export default function Education({ item }) {
  return (
    <View style={styles.container}>
      <View>
        <Icon
          name="keyboard-arrow-right"
          size={20}
          color={theme.colors.black}
        />
      </View>
      <TouchableOpacity>
        <View style={styles.bodyContainer}>
          <Text style={styles.primaryText}>{item.title}</Text>
          <Text style={styles.primaryText}>{item.location}</Text>
          <Text style={styles.secondText}>
            <Moment
              style={{ color: "#000" }}
              format="MMMM / YYYY"
              element={Text}
            >
              {item.startDate}
            </Moment>
            -
            <Moment
              style={{ color: "#000" }}
              format="MMMM / YYYY"
              element={Text}
            >
              {item.endDate}
            </Moment>
          </Text>
        </View>
      </TouchableOpacity>
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
