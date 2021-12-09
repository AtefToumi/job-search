import React, { useContext } from "react";

import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

import { colors } from "../constants/theme";
import { StoreContext } from "../store.context";

interface UserUpdateScreenProps {
  navigation: any;
}

const UserUpdateScreen = ({ navigation }: UserUpdateScreenProps) => {
  const { authStore } = useContext(StoreContext);
  const userInfo = authStore.userInfo;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="keyboard-arrow-left" size={30} color={colors.black} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.text_footer}>Name :</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            defaultValue={userInfo?.name}
          ></TextInput>
        </View>
        <Text style={styles.text_footer}>Title :</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            defaultValue={userInfo?.title}
          ></TextInput>
        </View>
        <Text style={styles.text_footer}>Address :</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            defaultValue={userInfo?.address}
          ></TextInput>
        </View>
        <Text style={styles.text_footer}>Bio :</Text>
        <View style={styles.bioAction}>
          <TextInput
            style={styles.bioInput}
            defaultValue={userInfo?.bio}
            multiline={true}
          ></TextInput>
        </View>
        <Button onPress={() => {}} title="submit" />
      </View>
    </SafeAreaView>
  );
};

export default UserUpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 20,
  },
  text_footer: {
    color: colors.gray,
    fontSize: 20,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: colors.lightBlack,
    borderWidth: 1,
    borderRadius: 10,
  },
  bioAction: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingTop: 15,
    borderColor: colors.lightBlack,
    borderWidth: 1,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: colors.gray,
    fontSize: 18,
  },
  bioInput: {
    flex: 1,
    paddingLeft: 10,
    color: colors.gray,
    fontSize: 18,
    height: 120,
  },
});
//name
//title
//location
//bio
