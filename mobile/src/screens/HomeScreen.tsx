import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, StatusBar, Button, View, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StoreContext } from "../store.context";
import IOfferData from "../types/offer.type";
import { colors } from "../constants/theme";
import Moment from "react-moment";
import Feather from "react-native-vector-icons/Feather";

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { authStore } = useContext(StoreContext);
  const { offerStore } = useContext(StoreContext);

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

  const display = () => {
    return offerStore.recentOffers?.map((item) => {
      return (
        <TouchableOpacity key={item?._id} style={styles.job}>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${item.image}`,
            }}
            style={styles.logo}
          />
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: 20,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              {item.company.name}
            </Text>
            <Text style={{ fontWeight: "bold", color: "#000", opacity: 0.5 }}>
              {item.title}
            </Text>
            <Text style={{ fontWeight: "bold", color: "#000", opacity: 0.5 }}>
              $ {item.salary} /Year
            </Text>
          </View>
          <View>
            <Text>{item.type}</Text>
            <Moment fromNow>{item.createdAt}</Moment>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.lightWhite,
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <StatusBar backgroundColor="#040507" />
      <Text
        style={{
          color: "#B0B0B0",
          marginTop: 40,
          fontWeight: "bold",
        }}
      >
        Hello {authStore.userName}
      </Text>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          marginTop: 13,
        }}
      >
        Find your best jobs
      </Text>
      <View
        style={{
          backgroundColor: "#FFF",
          borderRadius: 5,
          padding: 5,
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Feather name="search" color="black" size={20} />
        <TextInput
          placeholder="What are you looking for?"
          placeholderTextColor="#B0B0B0"
          style={{
            fontWeight: "bold",
            paddingHorizontal: 20,
          }}
        />
      </View>
      <Text
        style={{
          fontWeight: "bold",
          marginVertical: 20,
          fontSize: 15,
        }}
      >
        Recent Jobs:
      </Text>
      {offerStore.recentOffers && display()}
      <Button onPress={() => logout()} title="Logout" />
    </SafeAreaView>
  );
};

export default observer(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightWhite,
    justifyContent: "center",
  },
  text_header: {
    color: colors.gray,
    fontWeight: "bold",
    fontSize: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  logo: {
    borderRadius: 30,
    margin: 10,
    height: 60,
    width: 60,
  },
  job: {
    backgroundColor: "white",
    height: 80,
    elevation: 15,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
