import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import * as yup from "yup";
import { StoreContext } from "../store.context";
import { observer } from "mobx-react-lite";
import { colors } from "../constants/theme";

//@ts-ignore
const SignIn = ({ navigation }) => {
  const { authStore } = useContext(StoreContext);
  const [data, setData] = useState({
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidPassword: true,
  });
  const validationSchema = yup.object().shape({
    email: yup.string().label("E-mail").email().required(),
    password: yup.string().label("Password").required(),
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
        authStore.login(values).then(() => {
          navigation.navigate("Home");
        });
      }}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <React.Fragment>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.text_header}>Welcome..</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <Text style={styles.text_footer}>E-mail</Text>
              <View style={styles.action}>
                <FontAwesome name="user" color={colors.green} size={20} />
                <TextInput
                  placeholder="Enter your email.."
                  style={styles.textInput}
                  onChangeText={formikProps.handleChange("email")}
                  onBlur={formikProps.handleBlur("email")}
                />
              </View>
              <Text style={{ color: "grey" }}>
                {formikProps.touched.email && formikProps.errors.email}
              </Text>
              <Text style={[styles.text_footer, { marginTop: 20 }]}>
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color={colors.green} size={20} />
                <TextInput
                  placeholder="Enter your password"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={formikProps.handleChange("password")}
                  onBlur={formikProps.handleBlur("password")}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {data.secureTextEntry ? (
                    <Feather
                      name="eye-off"
                      color="grey"
                      size={20}
                      //style={sig.iconEye}
                    />
                  ) : (
                    <Feather
                      name="eye"
                      color="grey"
                      size={20}
                      // style={sig.iconEye}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={{ color: "grey" }}>
                {formikProps.touched.password && formikProps.errors.password}
              </Text>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  //@ts-ignore
                  onPress={formikProps.handleSubmit}
                >
                  <LinearGradient
                    colors={[colors.black, colors.lightgray]}
                    style={styles.signIn}
                  >
                    <Text style={[styles.textSign, { color: colors.green }]}>
                      Sign in
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SignUp")}
                  style={[
                    styles.signUp,
                    {
                      borderColor: colors.lightgray,
                      borderWidth: 1,
                      marginTop: 15,
                    },
                  ]}
                >
                  <Text style={[styles.textSign, { color: "#159c51" }]}>
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>
        </React.Fragment>
      )}
    </Formik>
  );
};

const Auth = observer(SignIn);
export { Auth };

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 2,
    backgroundColor: colors.dark,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomEndRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: colors.gray,
    fontWeight: "bold",
    fontSize: 40,
  },
  text_footer: {
    color: colors.gray,
    fontSize: 20,
  },
  action: {
    flexDirection: "row",
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    paddingBottom: 15,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: colors.gray,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signUp: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
