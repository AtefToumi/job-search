import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import * as theme from "../constants/theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import Experience from "../components/experience.component";
import Education from "../components/education.component";
import { StoreContext } from "../store.context";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "../navigation/GeneralStack";
import Skills from "../components/skills.component";
import { SwipeListView } from "react-native-swipe-list-view";

interface ProfileScreenProps {}

export default function Profile() {
  const { authStore } = useContext(StoreContext);
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  const userInfo = authStore.userInfo;
  const userExperience = userInfo?.experience;
  const userEducation = userInfo?.education;
  const userSkills = userInfo?.skills;

  useEffect(() => {
    console.log(userInfo);
  }, []);

  const renderHiddenItem = (item: any) => {
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="keyboard-arrow-left"
            size={30}
            color={theme.colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserUpdateScreen")}
        >
          <Icon name="edit" size={30} color={theme.colors.black} />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Company Details */}
        <View style={styles.titleContainer}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 10 }}
            source={{
              uri: `data:image/jpeg;base64,${userInfo?.image}`,
            }}
          />
          <View style={styles.titleTextContainer}>
            <Text style={styles.nameText}>{userInfo?.name}</Text>
            <Text style={styles.posText}>{userInfo?.title}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="location-on" size={20} color={theme.colors.gray} />
              <Text style={[styles.posText, { color: theme.colors.gray }]}>
                {userInfo?.address}
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.normalText}>{userInfo?.bio}</Text>

        {/* Experience */}
        <Text style={styles.titleText}>Work Experience</Text>
        <View>
          <SwipeListView
            data={userExperience}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return <Experience item={item} />;
            }}
            renderHiddenItem={({ item }) => renderHiddenItem(item)}
            rightOpenValue={-75}
          />
        </View>

        {/* Education */}
        <Text style={styles.titleText}>Education</Text>
        <View>
          <SwipeListView
            data={userEducation}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return <Education item={item} />;
            }}
            rightOpenValue={-75}
            renderHiddenItem={({ item }) => renderHiddenItem(item)}
          />
        </View>
        {/* Skills */}
        <Text style={styles.titleText}>Skills</Text>
        <View>
          <FlatList
            data={userSkills}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return <Skills item={item} />;
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.lightWhite,
  },
  body: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: theme.colors.lightWhite,
  },
  titleContainer: {
    flexDirection: "row",
  },
  titleTextContainer: {
    marginLeft: 10,
    justifyContent: "space-between",
  },
  nameText: {
    fontWeight: "bold",
    fontSize: theme.sizes.h6,
    textTransform: "capitalize",
    color: theme.colors.black,
  },
  posText: {
    fontWeight: "900",
    textTransform: "uppercase",
    fontSize: theme.sizes.h3,
    color: theme.colors.black,
  },
  titleText: {
    paddingTop: 20,
    paddingBottom: 7,
    fontWeight: "bold",
    fontSize: theme.sizes.h4,
    color: theme.colors.black,
  },
  normalText: {
    paddingTop: 15,
    fontWeight: "900",
    fontSize: theme.sizes.h3,
    color: theme.colors.black,
  },
  deleteButton: {
    alignSelf: "flex-end",
    width: 75,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginVertical: 3,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
