import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

export default class SignUpComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      check_textInputChange: false,
      password: "",
      password_confirm: "",
      secureTextEntry: true,
      secureTextEntry_confirm: true,
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
  secureTextEntry_confirm() {
    this.setState({
      secureTextEntry_confirm: !this.state.secureTextEntry_confirm,
    });
  }
  render() {
    return (
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
              onChangeText={(text) => this.textInputChange(text)}
            />
            {this.state.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={[styles.text_footer, { marginTop: 20 }]}>Password</Text>
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
          <Text style={[styles.text_footer, { marginTop: 20 }]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#159c51" size={20} />
            {this.state.secureTextEntry_confirm ? (
              <TextInput
                placeholder="Enter your password again.."
                secureTextEntry={true}
                style={styles.textInput}
                value={this.state.password_confirm}
                onChangeText={(text) =>
                  this.setState({
                    password_confirm: text,
                  })
                }
              />
            ) : (
              <TextInput
                placeholder="Enter your password.."
                secureTextEntry={false}
                style={styles.textInput}
                value={this.state.password_confirm}
                onChangeText={(text) =>
                  this.setState({
                    password_confirm: text,
                  })
                }
              />
            )}
            <TouchableOpacity onPress={() => this.secureTextEntry_confirm()}>
              {this.state.secureTextEntry_confirm ? (
                <Feather name="eye-off" color="gray" size={20} />
              ) : (
                <Feather name="eye" color="green" size={20} />
              )}
            </TouchableOpacity>
          </View>
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
