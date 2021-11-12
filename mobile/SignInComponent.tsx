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

export default class SignInComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      check_textInputChange: false,
      password: "",
      secureTextEntry: true,
    };
  }
  textInputChange(value: any) {
    if (value.length !== 0) {
      this.setState({
        check_textInputChange: true,
      });
    } else {
      this.setState({
        check_textInputChange: false,
      });
    }
  }
  secureTextEntry() {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  }
  validationSchema = yup.object().shape({
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
  login = async (values: any, formikActions: any) => {
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

  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          console.log(JSON.stringify(values));
          // setTimeout(() => {
          //   actions.setSubmitting(false);
          // }, 1000);
          this.login(values, actions);
        }}
        validationSchema={this.validationSchema}
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
                  <FontAwesome name="user" color="#159c51" size={20} />
                  <TextInput
                    placeholder="Enter your email.."
                    style={styles.textInput}
                    onChangeText={
                      // console.log(">>>>>>>>>", email);// this.textInputChange(email);
                      formikProps.handleChange("email")
                    }
                    onBlur={formikProps.handleBlur("email")}
                  />
                  {this.state.check_textInputChange ? (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={20} />
                    </Animatable.View>
                  ) : null}
                </View>
                <Text style={{ color: "red" }}>
                  {formikProps.touched.email && formikProps.errors.email}
                </Text>
                <Text style={[styles.text_footer, { marginTop: 20 }]}>
                  Password
                </Text>
                <View style={styles.action}>
                  <Feather name="lock" color="#159c51" size={20} />
                  {this.state.secureTextEntry ? (
                    <TextInput
                      placeholder="Enter your password.."
                      secureTextEntry={true}
                      style={styles.textInput}
                      value={this.state.password}
                      onChangeText={(text) =>
                        this.setState({
                          password: text,
                        })
                      }
                    />
                  ) : (
                    <TextInput
                      placeholder="Enter your password.."
                      secureTextEntry={false}
                      style={styles.textInput}
                      value={this.state.password}
                      onChangeText={(text) =>
                        this.setState({
                          password: text,
                        })
                      }
                    />
                  )}
                  <TouchableOpacity onPress={() => this.secureTextEntry()}>
                    {this.state.secureTextEntry ? (
                      <Feather name="eye-off" color="gray" size={20} />
                    ) : (
                      <Feather name="eye" color="green" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.button}>
                  <TouchableOpacity
                    type="submit"
                    onPress={() =>
                      this.login(formikProps.values, formikProps.actions)
                    }
                  >
                    <LinearGradient
                      colors={["#159c51", "#64e19c"]}
                      style={styles.signIn}
                    >
                      <Text style={[styles.textSign, { color: "white" }]}>
                        Sign in
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("SignUpScreen")
                    }
                    style={[
                      styles.signUp,
                      {
                        borderColor: "#159c51",
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
  }
}

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
    borderBottomColor: "#159c51",
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
  signUp: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  signIn: {
    width: 300,
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
