import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

//@ts-ignore
const Splash = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          source={require("../../assets/js-logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>
          Find the best Job for you all around the World!
        </Text>
        <Text style={styles.text}>Sign in with existing account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <LinearGradient
              colors={["#159c51", "#64e19c"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#333B42" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Splash;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.7 * 0.5;
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#64e19c",
  },
  header: {
    flex: 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#333B42",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#159c51",
    fontWeight: "bold",
    fontSize: 30,
  },
  text: {
    color: "gray",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  textSign: {
    color: "#333B42",
    fontWeight: "bold",
  },
});
