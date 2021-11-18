import React from "react";
import { Text, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AnalyticsScreenProps {
  navigation: any;
}

const ProfileScreen = ({ navigation }: AnalyticsScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#040507" />
      <Text style={{ fontSize: 40, color: "white" }}> Profile screen </Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040507",
    alignItems: "center",
  },
});
