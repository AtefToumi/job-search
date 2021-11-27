import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const BottomNavigator = () => {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity>
        <FontAwesome name={"home"} color={"#696969"} size={30} />
        <Text>Applications</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name={"home"} color={"#696969"} size={30} />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name={"home"} color={"#696969"} size={30} />
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "#64e19c",
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    padding: 5,
  },
  barItemView: {
    color: "#696969",
    marginTop: 3,
  },
});
