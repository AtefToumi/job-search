import { observer } from "mobx-react-lite";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { colors } from "../constants/theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RouteParams } from "../navigation/GeneralStack";

interface OfferScreenProps {
  navigation: any;
}

const OfferScreen = ({ navigation }: OfferScreenProps) => {
  const route = useRoute<RouteProp<RouteParams>>();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="keyboard-arrow-left" size={30} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {
            //@ts-ignore
            route.params?.company.name
          }
        </Text>
        <View style={{ padding: 20 }}></View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Company Details */}
          <View style={styles.companyContainer}>
            <Image
              style={{ width: 200, height: 200, borderRadius: 20 }}
              source={{
                uri: `data:image/jpeg;base64,${route.params?.logo}`,
              }}
            />
            <Text style={styles.jobTitle}>{route.params?.title}</Text>
            <Text style={styles.jobSalary}>{route.params?.salary} $/Year</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={[styles.tag, { marginRight: 10 }]}>
                <Text>{route.params?.type}</Text>
              </View>
              <View style={styles.tag}>
                <Text>{route.params?.location}</Text>
              </View>
            </View>
          </View>
          {/* Job Details */}
          <View>
            <Text style={styles.jobTitle}>About the opportunity</Text>
            <Text style={styles.descriptionText}>
              {route.params?.requirements}
            </Text>
            <Text style={styles.jobTitle}>Job Responsabilities</Text>
            <View style={{ flexDirection: "row", marginTop: 7 }}>
              <Icon name="check" size={20} color={colors.black} />
              <Text style={[styles.descriptionText, { marginTop: 0 }]}>
                {route.params?.description}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 7 }}>
              <Icon name="check" size={20} color={colors.black} />
              <Text style={[styles.descriptionText, { marginTop: 0 }]}>
                description
              </Text>
            </View>
          </View>
        </ScrollView>
        {/* Footer */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.btnContainer,
              { flex: 1, backgroundColor: colors.green, marginLeft: 5 },
            ]}
          >
            <Text
              style={[styles.jobTitle, { color: colors.white, marginTop: 0 }]}
            >
              Apply Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default observer(OfferScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
    paddingVertical: 30,
  },
  header: {
    height: 70,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.green,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  body: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: colors.lightWhite,
  },
  companyContainer: {
    padding: 30,
    alignItems: "center",
  },
  jobTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  jobSalary: {
    marginTop: 5,
    fontWeight: "900",
  },
  tag: {
    padding: 7,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.silver,
    backgroundColor: colors.green,
  },
  descriptionText: {
    marginTop: 10,
  },
  btnContainer: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
