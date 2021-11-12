import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  Input,
  NativeBaseProvider,
  Button,
  Icon,
  Box,
  Image,
  AspectRatio,
} from "native-base";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { alignContent, flex, flexDirection, width } from "styled-system";
import { Formik } from "formik";
import * as yup from "yup";
import client from "../api/client";

function Login() {
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
            <View style={styles.Middle}>
              <Text style={styles.LoginText}>Login</Text>
            </View>
            <View style={styles.text2}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.signupText}> Sign up</Text>
              </TouchableOpacity>
            </View>

            {/* Username or Email Input Field */}
            <View style={styles.buttonStyle}>
              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcons name="email" />}
                      size="sm"
                      m={2}
                      _light={{
                        color: "black",
                      }}
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                  }
                  variant="outline"
                  placeholder="Email"
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  onChangeText={formikProps.handleChange("email")}
                  onBlur={formikProps.handleBlur("email")}
                  autoFocus
                />
              </View>
              <Text style={{ color: "red" }}>
                {formikProps.touched.email && formikProps.errors.email}
              </Text>
            </View>

            {/* Password Input Field */}
            <View style={styles.buttonStyleX}>
              <View style={styles.emailInput}>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome5 name="key" />}
                      size="sm"
                      m={2}
                      _light={{
                        color: "black",
                      }}
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                  }
                  variant="outline"
                  secureTextEntry={true}
                  placeholder="Password"
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  onChangeText={formikProps.handleChange("password")}
                  onBlur={formikProps.handleBlur("password")}
                />
              </View>
              <Text style={{ color: "red" }}>
                {formikProps.touched.password && formikProps.errors.password}
              </Text>
            </View>

            {/* Button */}
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <View style={styles.buttonStyle}>
                <Button
                  type="submit"
                  style={styles.buttonDesign}
                  onPress={formikProps.handleSubmit}
                >
                  LOGIN
                </Button>
              </View>
            )}
          </React.Fragment>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Login />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  LoginText: {
    marginTop: 200,
    fontSize: 30,
    fontWeight: "bold",
  },
  Middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
  },
  signupText: {
    fontWeight: "bold",
  },
  emailField: {
    marginTop: 30,
    marginLeft: 15,
  },
  emailInput: {
    marginTop: 10,
    marginRight: 5,
  },
  buttonStyle: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDesign: {
    backgroundColor: "#026efd",
  },
  lineStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginLeft: 20,
  },
  boxStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "space-around",
  },
});
