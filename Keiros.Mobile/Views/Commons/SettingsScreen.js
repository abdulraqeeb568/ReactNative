import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as Constants from "../../Commons/Constants";
import { Styles } from "../../Commons/Styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import AwesomeAlert from "react-native-awesome-alerts";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const SettingsScreen = ({ navigation, route }) => {
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertText, setAlertText] = useState("");

  const handleLogout = async () => {
    setIsShowAlert(false);
    SecureStore.deleteItemAsync("secure_token").then(
      navigation.navigate("SignInScreen")
    );
  };
  const handleLogoutPressed = async () => {
    setIsShowAlert(true);
    setAlertTitle("Logout");
    setAlertText(Constants.LogoutConfirmationText);
  };

  return (
    <View style={styles.settingsContainer}>
      <View style={Styles.header}>
        <Image
          style={Styles.logoImage}
          source={require("../..//assets/ic_elit_logo.png")}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("UpdateProfileScreen")}
      >
        <View style={Styles.navigationButtons}>
          <MaterialCommunityIcons name="account-outline" size={45} />
          <View>
            <Text style={{ fontSize: 18, paddingLeft: "0", marginLeft: "0" }}>
              Profile Update
            </Text>
            <Text style={{ color: "gray", fontSize: 12 }}>
              Name,Mobile Number, Picture
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("UpdatePasswordScreen")}
      >
        <View style={Styles.navigationButtons}>
          <MaterialCommunityIcons name="lock-outline" size={45} />
          <View>
            <Text style={{ fontSize: 18, paddingLeft: "0", marginLeft: "0" }}>
              Change Password
            </Text>
            <Text style={{ color: "gray", fontSize: 12 }}>
              Old Password, New Password, Confirm Password
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("HelpScreen")}>
        <View style={Styles.navigationButtons}>
          <MaterialCommunityIcons name="help-circle-outline" size={45} />
          <View>
            <Text style={{ fontSize: 18, paddingLeft: "0", marginLeft: "0" }}>
              Help
            </Text>
            <Text style={{ color: "gray", fontSize: 12 }}>
              User guide, Setup Information
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogoutPressed}>
        <View style={Styles.navigationButtons}>
          <MaterialCommunityIcons name="logout" size={45} />
          <View>
            <Text style={{ fontSize: 18, paddingLeft: "0", marginLeft: "0" }}>
              Logout
            </Text>
            <Text style={{ color: "gray", fontSize: 12 }}>Logout</Text>
          </View>
        </View>
      </TouchableOpacity>
      <AwesomeAlert
        show={isShowAlert}
        showProgress={false}
        title={alertTitle}
        message={alertText}
        messageStyle={{ textAlign: "center" }}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        cancelButtonColor="green"
        confirmButtonColor="red"
        onCancelPressed={() => {
          setIsShowAlert(false);
        }}
        onConfirmPressed={() => {
          handleLogout();
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create({
  settingsContainer: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "column",
    alignSelf: "center",
    backgroundColor: "#F4F4F4",
  },
});
export default SettingsScreen;
