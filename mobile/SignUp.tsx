import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

import { Formik } from "formik";
import * as yup from "yup";
import client from "./api/client";
import { useNavigation } from "@react-navigation/native";

function SignUp() {
  const navigation = useNavigation();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .label("Email")
      .email()
      .required("Please enter your Email"),
    password: yup
      .string()
      .label("Password")
      .required("Please enter your Password"),
  });
  const login = async (values: any, formikActions: any) => {
    const res = await client.post("/login", {
      ...values,
    });
    console.log(res);
    // if (res.data.success) {
    //   const loginRes = await client.post("login", {
    //     email: values.email,
    //     password: values.password,
    //   });

    // }

    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, actions) => {
        console.log(JSON.stringify(values));
        // setTimeout(() => {
        //   actions.setSubmitting(false);
        // }, 1000);
        login(values, actions);
      }}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <React.Fragment>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.text_header}>
                We need some info to register you ..
              </Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <Text style={styles.text_footer}>E-mail</Text>
              <View style={styles.action}>
                <FontAwesome name="user" color="#159c51" size={20} />
                <TextInput
                  placeholder="Enter your email.."
                  style={styles.textInput}
                  onChangeText={() => {}}
                />
                {/* {this.state.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null} */}
              </View>
              <Text style={[styles.text_footer, { marginTop: 20 }]}>
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#159c51" size={20} />
                <TextInput
                  placeholder="Enter your password"
                  secureTextEntry={true}
                  style={styles.textInput}
                  onChangeText={formikProps.handleChange("password")}
                  onBlur={formikProps.handleBlur("password")}
                />
              </View>
              <Text style={{ color: "red" }}>
                {formikProps.touched.password && formikProps.errors.password}
              </Text>

              <Text style={[styles.text_footer, { marginTop: 20 }]}>
                Confirm Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#159c51" size={20} />
                <TextInput
                  placeholder="Enter your password"
                  secureTextEntry={true}
                  style={styles.textInput}
                  onChangeText={formikProps.handleChange("password")}
                  onBlur={formikProps.handleBlur("password")}
                />
              </View>
              <Text style={{ color: "red" }}>
                {formikProps.touched.password && formikProps.errors.password}
              </Text>

              <View style={styles.button}>
                <LinearGradient
                  colors={["#159c51", "#64e19c"]}
                  style={styles.signIn}
                >
                  <Text style={[styles.textSign, { color: "white" }]}>
                    REGISTER
                  </Text>
                </LinearGradient>
              </View>
            </Animatable.View>
          </View>
        </React.Fragment>
      )}
    </Formik>
  );
}

export default () => {
  return <SignUp />;
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#64e19c",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
  },
  text_footer: {
    color: "#159c51",
    fontSize: 20,
  },
  action: {
    flexDirection: "row",
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 15,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#159c51",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
