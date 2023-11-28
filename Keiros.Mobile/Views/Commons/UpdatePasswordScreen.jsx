import { StatusBar } from "expo-status-bar";
import React, { useState, useLayoutEffect, useEffect } from "react";
import * as Constants from "../../Commons/Constants";
import * as Functions from "../../Commons/Functions";
import { Styles } from "../../Commons/Styles";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as SecureStore from "expo-secure-store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
} from "react-native";

const UpdatePasswordScreen = ({ email, navigation, token }) => {
  let [oldPassword, setOldPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  const [hideOldPass, setHideOldPass] = useState(true);
  const [hideNewPass, setHideNewPass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const [isValidOldPassword, setIsValidOldPassword] = useState(true);
  const [isValidNewPassword, setIsValidNewPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [isFieldRequired, setIsFieldRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isErrorOccurred, setIsErrorOccurred] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Update Password",
    });
  }, [navigation]);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const UpdatePasswordClicked = async () => {
    setResponseMsg("");
    setIsErrorOccurred(false);
    if (!isValidConfirmPassword || !isValidOldPassword || !isValidNewPassword) {
      return;
    }
    if (!oldPassword || !newPassword || !confirmPassword) {
      return setIsFieldRequired(true);
    }
    if (newPassword !== confirmPassword) {
      return setIsPasswordMatched(false);
    }
    setIsLoading(true);
    let token = await SecureStore.getItemAsync("secure_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const requestBody = {
      currentPassword: oldPassword,
      newPassword: newPassword,
    };
    const instance = axios.create({
      validateStatus: function (status) {
        // Treat 404 or 500 as a valid response
        return (
          (status >= 200 && status < 300) || status === 404 || status === 500
        );
      },
    });
    const result = await instance
      .put(Constants.UpdatePassword, requestBody, config)
      .then((res) => {
        res.data.returnValue === 200
          ? setIsErrorOccurred(false)
          : setIsErrorOccurred(true);
        setResponseMsg(res.data.returnMessage);
      })
      .catch((err) => {
        console.log("err" + err);
        setIsErrorOccurred(true);
        setResponseMsg("Something went wrong");
      });
    setIsLoading(false);
  };

  const handleOldPassword = (value) => {
    setIsValidOldPassword(Functions.isValidPassword(value));
    setOldPassword(value);
  };
  const handleNewPassword = (value) => {
    setIsValidNewPassword(Functions.isValidPassword(value));
    setNewPassword(value);
    value === confirmPassword
      ? setIsPasswordMatched(true)
      : setIsPasswordMatched(false);
  };
  const handleConfirmPassword = (value) => {
    setIsValidConfirmPassword(Functions.isValidPassword(value));
    setConfirmPassword(value);
    newPassword === value
      ? setIsPasswordMatched(true)
      : setIsPasswordMatched(false);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
    >
      <View style={Styles.container}>
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={Styles.spinnerTextStyle}
          color="black"
        />
        {!isKeyboardVisible && (
          <View style={Styles.header}>
            <Image
              style={Styles.logoImage}
              source={require("../..//assets/ic_elit_logo.png")}
            />
          </View>
        )}
        <View style={{ flex: 1, width: "95%" }}>
          <View style={Styles.ViewUpdatePassword}>
            <TextInput
              style={Styles.TextInputPasswordUpdate}
              placeholder="Old Password"
              placeholderTextColor="gray"
              required
              onChangeText={(value) => handleOldPassword(value)}
              secureTextEntry={hideOldPass ? true : false}
            />
            <Icon
              name={hideOldPass ? "eye-slash" : "eye"}
              onPress={() => setHideOldPass(!hideOldPass)}
            />
          </View>
          {!oldPassword && isFieldRequired && (
            <Text style={Styles.invalidText}>
              {Constants.RequiredFieldText}
            </Text>
          )}
          {!isValidOldPassword && oldPassword && (
            <Text style={Styles.invalidText}>Invalid Password</Text>
          )}
          <View style={Styles.ViewUpdatePassword}>
            <TextInput
              style={Styles.TextInputPasswordUpdate}
              placeholder="New Password"
              placeholderTextColor="gray"
              onChangeText={(newPassword) => handleNewPassword(newPassword)}
              secureTextEntry={hideNewPass ? true : false}
            />
            <Icon
              name={hideNewPass ? "eye-slash" : "eye"}
              onPress={() => setHideNewPass(!hideNewPass)}
            />
          </View>
          {!newPassword && isFieldRequired && (
            <Text style={Styles.invalidText}>
              {Constants.RequiredFieldText}
            </Text>
          )}
          {!isValidNewPassword && newPassword && (
            <Text style={Styles.invalidText}>Invalid Password</Text>
          )}
          <View style={Styles.ViewUpdatePassword}>
            <TextInput
              style={Styles.TextInputPasswordUpdate}
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              onChangeText={(confirmPassword) =>
                handleConfirmPassword(confirmPassword)
              }
              secureTextEntry={hideConfirmPass ? true : false}
            />
            <Icon
              name={hideConfirmPass ? "eye-slash" : "eye"}
              onPress={() => setHideConfirmPass(!hideConfirmPass)}
            />
          </View>
          {!isPasswordMatched && (
            <Text style={Styles.invalidText}>
              {Constants.PasswordMisMatchedText}
            </Text>
          )}
          {(!isValidConfirmPassword ||
            !isValidNewPassword ||
            !isValidOldPassword) && (
            <Text style={Styles.invalidText}>
              {Constants.InvalidPasswordText}
            </Text>
          )}
          <TouchableOpacity
            style={Styles.button}
            onPress={UpdatePasswordClicked}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Update
            </Text>
          </TouchableOpacity>
          <Text style={isErrorOccurred ? Styles.invalidText : Styles.validText}>
            {responseMsg}
          </Text>
        </View>
        <StatusBar style="auto" />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default UpdatePasswordScreen;
