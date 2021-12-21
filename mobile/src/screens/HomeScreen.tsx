import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  StatusBar,
  Button,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { StoreContext } from "../store.context";
import { colors } from "../constants/theme";
import Moment from "react-moment";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "../navigation/GeneralStack";

interface HomeScreenProps {}
const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  const { authStore } = useContext(StoreContext);
  const { offerStore } = useContext(StoreContext);

  const userInfo = authStore.userInfo;

  useEffect(() => {
    if (!authStore?.authenticated) {
      navigation.navigate("SignIn");
    }
  }, [authStore]);

  const display = () => {
    return offerStore.recentOffers?.map((item) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("OfferScreen", {
              _id: item._id,
              company: item.company,
              title: item.title,
              salary: item.salary,
              location: item.location,
              type: item.type,
              description: item.description,
              requirements: item.requirements,
              logo: item.image,
            })
          }
          key={item?._id}
          style={styles.job}
        >
          <Image
            source={{
              uri: `data:image/jpeg;base64,${item.image}`,
            }}
            style={styles.logo}
          />
          <View
            style={{
              height: 100,
              marginLeft: width * 0.01,
              paddingVertical: width * 0.05,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              {
                //@ts-ignore
                item.company.name
              }
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#000",
                opacity: 0.5,
                marginVertical: 5,
              }}
            >
              {item.title}
            </Text>
            <Text style={{ fontWeight: "bold", color: "#000", opacity: 0.5 }}>
              $ {item.salary} /Year
            </Text>
          </View>
          <View>
            <Text>{item.type}</Text>
            <Moment style={{ color: "#000" }} fromNow element={Text}>
              {item.createdAt}
            </Moment>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#040507" />
      <SafeAreaView style={styles.titleContainer}>
        <Image
          style={{
            width: 70,
            height: 70,
            borderRadius: 20,
            borderColor: colors.black,
            borderWidth: 2,
          }}
          source={{
            uri: `data:image/jpeg;base64,${userInfo?.image}`,
          }}
        />
        <View style={styles.titleTextContainer}>
          <Text style={styles.nameText}>
            Welcome{"\n"}
            {userInfo?.name}
          </Text>
        </View>
      </SafeAreaView>

      <View style={styles.footer}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            marginTop: 13,
          }}
        >
          Find your future job
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
        <ScrollView>{offerStore.recentOffers && display()}</ScrollView>
      </View>
    </View>
  );
};

export default observer(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  footer: {
    flex: 6,
    paddingHorizontal: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.lightWhite,
  },
  titleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 20,
  },
  titleTextContainer: {
    marginTop: 10,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 24,
    textTransform: "capitalize",
    color: colors.black,
  },
  text_header: {
    color: colors.gray,
    fontWeight: "bold",
    fontSize: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  logo: {
    borderRadius: 20,
    margin: 10,
    height: 60,
    width: 60,
  },
  job: {
    backgroundColor: colors.lightWhite,
    height: 80,
    elevation: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
