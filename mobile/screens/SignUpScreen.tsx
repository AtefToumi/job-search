import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import {
  FormControl,
  Container,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  Center,
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
import DatePicker from "react-native-datepicker";
import { Formik } from "formik";
import * as yup from "yup";
import client from "../api/client";

function Signup() {
  const navigation = useNavigation();
  const [date, setDate] = useState("09-10-2020");

  const validationSchema = yup.object().shape({
    email: yup.string().label("Email").email().required(),
    password: yup
      .string()
      .label("Password")
      .required()
      .min(2, "Seems a bit short...")
      .max(10, "We prefer insecure system, try a shorter password."),
    confirmpassword: yup
      .string()
      .when("password", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Does not match password given above"),
      })
      .required("Confirm Password Required"),
    name: yup
      .string()
      .label("Name")
      .required()
      .min(2, "Enter a valid name")
      .max(30, "That's too long"),
    address: yup
      .string()
      .label("Address")
      .required()
      .min(2, "Enter a valid address")
      .max(50, "That's too long"),
  });
  const signUp = async (values, formikActions) => {
    const res = await client.post("/register", {
      ...values,
    });
    console.log(res);

    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmpassword: "",
          name: "",
          address: "",
        }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values));
          // setTimeout(() => {
          //   actions.setSubmitting(false);
          // }, 1000);
          signUp(values, actions);
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <React.Fragment>
            <ScrollView>
              <View style={styles.Middle}>
                <Text style={styles.LoginText}>Signup</Text>
              </View>
              <View style={styles.text2}>
                <Text>Already have account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.signupText}> Login </Text>
                </TouchableOpacity>
              </View>

              {/* Username or Email Input Field */}
              <View style={styles.buttonStyleX}>
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
                  <Text style={{ color: "red" }}>
                    {formikProps.touched.email && formikProps.errors.email}
                  </Text>
                </View>
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
                  <Text style={{ color: "red" }}>
                    {formikProps.touched.password &&
                      formikProps.errors.password}
                  </Text>
                </View>
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
                    placeholder="Confirm Password"
                    _light={{
                      placeholderTextColor: "blueGray.400",
                    }}
                    _dark={{
                      placeholderTextColor: "blueGray.50",
                    }}
                    onChangeText={formikProps.handleChange("confirmpassword")}
                    onBlur={formikProps.handleBlur("confirmpassword")}
                  />
                  <Text style={{ color: "red" }}>
                    {formikProps.touched.confirmpassword &&
                      formikProps.errors.confirmpassword}
                  </Text>
                </View>
              </View>

              {/* Name Input Field */}
              <View style={styles.buttonStyleX}>
                <View style={styles.emailInput}>
                  <Input
                    InputLeftElement={
                      <Icon
                        as={<MaterialCommunityIcons name="account-tie" />}
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
                    placeholder="Name"
                    _light={{
                      placeholderTextColor: "blueGray.400",
                    }}
                    _dark={{
                      placeholderTextColor: "blueGray.50",
                    }}
                    onChangeText={formikProps.handleChange("name")}
                    onBlur={formikProps.handleBlur("name")}
                  />
                  <Text style={{ color: "red" }}>
                    {formikProps.touched.name && formikProps.errors.name}
                  </Text>
                </View>
              </View>

              {/* Address Input Field */}
              <View style={styles.buttonStyleX}>
                <View style={styles.emailInput}>
                  <Input
                    InputLeftElement={
                      <Icon
                        as={<MaterialCommunityIcons name="map-marker" />}
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
                    placeholder="Address"
                    _light={{
                      placeholderTextColor: "blueGray.400",
                    }}
                    _dark={{
                      placeholderTextColor: "blueGray.50",
                    }}
                    onChangeText={formikProps.handleChange("address")}
                    onBlur={formikProps.handleBlur("address")}
                  />
                  <Text style={{ color: "red" }}>
                    {formikProps.touched.address && formikProps.errors.address}
                  </Text>
                </View>
              </View>

              {/* Phone Input Field */}
              <View style={styles.buttonStyleX}>
                <View style={styles.emailInput}>
                  <Input
                    InputLeftElement={
                      <Icon
                        as={<MaterialCommunityIcons name="phone" />}
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
                    placeholder="Phone Number"
                    _light={{
                      placeholderTextColor: "blueGray.400",
                    }}
                    _dark={{
                      placeholderTextColor: "blueGray.50",
                    }}
                  />
                </View>
              </View>
              {/* Date Of Birth Input */}
              {/* <View style={styles.buttonStyleX}>
        <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-1900"
          maxDate="01-01-2030"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
      </View> */}

              <Container style={[styles.buttonStyleX, styles.emailInput]}>
                <FormControl isRequired isInvalid>
                  <Select
                    accessibilityLabel="Choose Service"
                    placeholder="Gender"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size={3} />,
                    }}
                    mt="1"
                  >
                    <Select.Item label="Female" value="F" />
                    <Select.Item label="Male" value="M" />
                    <Select.Item label="Other" value="O" />
                  </Select>
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Please make a selection!
                  </FormControl.ErrorMessage>
                </FormControl>
              </Container>

              {formikProps.isSubmitting ? (
                <ActivityIndicator />
              ) : (
                <View style={styles.buttonStyle}>
                  <Button
                    type="submit"
                    style={styles.buttonDesign}
                    onPress={formikProps.handleSubmit}
                  >
                    REGISTER
                  </Button>
                </View>
              )}

              {/* Line */}
              {/* <View style={styles.lineStyle}>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <View>
          <Text style={{ width: 50, textAlign: "center" }}>Or</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View> */}

              {/* Box
      <View style={styles.boxStyle}></View>
      <StatusBar style="auto" /> */}
            </ScrollView>
          </React.Fragment>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Signup />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  LoginText: {
    marginTop: 100,
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
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  dateStyle: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerStyle: {
    width: 200,
    marginTop: 12,
    marginLeft: -13,
  },
});
