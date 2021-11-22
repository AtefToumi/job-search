import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Text, StyleSheet, StatusBar, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StoreContext } from "../store.context";

interface AnalyticsScreenProps {
  navigation: any;
}

const HomeScreen = ({ navigation }: AnalyticsScreenProps) => {
  const { authStore } = useContext(StoreContext);

  useEffect(() => {
    if (!authStore?.authenticated) {
      navigation.navigate("SignIn");
    }
  }, [authStore]);

  const logout = () => {
    authStore.logout().then(() => {
      navigation.navigate("SignIn");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#040507" />
      <Text style={{ fontSize: 40, color: "white" }}>Home screen</Text>
      <Button onPress={() => logout()} title="Logout" />
    </SafeAreaView>
  );
};

export default observer(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040507",
    alignItems: "center",
  },
});
