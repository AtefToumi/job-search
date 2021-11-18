import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import * as yup from "yup";
import client from "../api/client";
import { StoreContext } from "../store.context";
import { observer } from "mobx-react-lite";

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
  const login = async (values: any, formikActions: any) => {
    const res = await client.post("/login", {
      ...values,
    });
    console.log(values);
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
        authStore.login(values);
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
                <FontAwesome name="user" color="#159c51" size={20} />
                <TextInput
                  placeholder="Enter your email.."
                  style={styles.textInput}
                  onChangeText={formikProps.handleChange("email")}
                  onBlur={formikProps.handleBlur("email")}
                />
              </View>
              <Text style={{ color: "red" }}>
                {formikProps.touched.email && formikProps.errors.email}
              </Text>
              <Text style={[styles.text_footer, { marginTop: 20 }]}>
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#159c51" size={20} />
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
              <Text style={{ color: "red" }}>
                {formikProps.touched.password && formikProps.errors.password}
              </Text>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  //@ts-ignore
                  onPress={formikProps.handleSubmit}
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
                  onPress={() => navigation.navigate("SignUp")}
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
};

const Auth = observer(SignIn);
export { Auth };

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
