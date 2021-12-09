import React, { useContext } from "react";
import { Text, StyleSheet, StatusBar, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/theme";
import { StoreContext } from "../store.context";

interface AnalyticsScreenProps {
  navigation: any;
}

const SettingScreen = ({ navigation }: AnalyticsScreenProps) => {
  const { authStore } = useContext(StoreContext);

  const logout = () => {
    authStore.logout().then(() => {
      navigation.navigate("SignIn");
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#040507" />
      <Text style={{ fontSize: 40, color: "white" }}>Settings screen</Text>
      <Button color={colors.green} onPress={() => logout()} title="Logout" />
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040507",
    alignItems: "center",
  },
});
