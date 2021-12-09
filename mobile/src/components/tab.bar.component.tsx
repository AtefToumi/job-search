import React from "react";
import { colors } from "../constants/theme";

import { View, Pressable, Dimensions, StyleSheet } from "react-native";
import NavigationIcon from "../navigation/navigationIcon";

const { width } = Dimensions.get("window");

const TabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View
            key={index}
            style={[
              styles.mainItemContainer,
              { borderRightWidth: label == "profile" ? 3 : 0 },
            ]}
          >
            <Pressable
              onPress={onPress}
              style={{
                backgroundColor: colors.green,
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  padding: 15,
                }}
              >
                <NavigationIcon route={label} isFocused={isFocused} />
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    backgroundColor: colors.green,
    borderRadius: 25,
    marginHorizontal: 30,
    elevation: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 1,
    borderColor: "#333B42",
  },
});

export default TabBar;
