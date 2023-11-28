import { StatusBar } from "expo-status-bar";
import React, { useState, useLayoutEffect, useEffect } from "react";
import * as Constants from "../../Commons/Constants";
import { Styles } from "../../Commons/Styles";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Spinner from "react-native-loading-spinner-overlay";
import { webAPIUrl } from "../../AppSettings";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ToggleSwitch from "toggle-switch-react-native";

const UpdateProfileScreen = ({ navigation, route }) => {
  let [name, setName] = useState("");
  let [address, setAddress] = useState("");
  let [isAppNotification, setIsAppNotification] = useState(true);
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formattedNumber, setFormattedNumber] = useState("");
  const [responseMsg, setResponseMsg] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isErrorOccurred, setIsErrorOccurred] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Update Profile",
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

  const handleRequiredFields = (fieldName) => {
    setIsErrorOccurred(true);
    setResponseMsg(`${fieldName} cannot be empty`);
  };

  const UpdateProfileClicked = async () => {
    setIsErrorOccurred(false);
    setResponseMsg("");
    name === ""
      ? handleRequiredFields("Name")
      : number === ""
      ? handleRequiredFields("Phone Number")
      : "";
    console.log("clicked" + name + number + address);
    if (name === "" || number === "" || address === "") return;
    setIsLoading(true);
    let token = await SecureStore.getItemAsync("secure_token");
    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const requestBody = {
      name: name,
      mobile: formattedNumber,
      address: address,
      notifyStatus: isAppNotification,
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
      .put(Constants.UpdateProfile, requestBody, config)
      .then((res) => {
        console.log(JSON.stringify(res));
        res.data.returnValue === 200
          ? setIsErrorOccurred(false)
          : setIsErrorOccurred(true);
        setResponseMsg(res.data.returnMessage);
      })
      .catch((err) => {
        console.log(err.response);
        setIsErrorOccurred(true);
        if (err.response.status === 401)
          setResponseMsg("You are not authorized to update profile");
        else setResponseMsg("Something went wrong");
      });
    setIsLoading(false);
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
        <View style={Styles.bodyContainer}>
          <View style={Styles.inputField}>
            <TextInput
              style={Styles.TextInputPasswordUpdate}
              placeholder="Your name"
              placeholderTextColor="gray"
              onChangeText={(name) => setName(name)}
            />
          </View>
          <PhoneInput
            defaultValue={number}
            defaultCode="PK"
            layout="first"
            onChangeText={(text) => {
              setNumber(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedNumber(text);
            }}
            withDarkTheme
            containerStyle={Styles.phoneNumberContainer}
            textContainerStyle={{
              backgroundColor: "transparent",
            }}
            flagButtonStyle={{ width: 50, backgroundColor: "transparent" }}
          />
          <View style={Styles.inputField}>
            <TextInput
              style={Styles.TextInputPasswordUpdate}
              placeholder="Your address"
              placeholderTextColor="gray"
              onChangeText={(address) => setAddress(address)}
            />
          </View>
          <View style={Styles.ViewUpdatePassword}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                alignSelf: "flex-end",
                margin: 5,
              }}
            >
              Enable Notifications
            </Text>
            <View
              style={{
                margin: 5,
                marginRight: 0,
                fontSize: 18,
                alignSelf: "flex-end",
              }}
            >
              <ToggleSwitch
                isOn={isAppNotification}
                onColor="green"
                offColor="red"
                labelStyle={{ color: "black", fontWeight: "900" }}
                onToggle={(isOn) => setIsAppNotification(isOn)}
                size="medium"
              />
            </View>
          </View>
          <TouchableOpacity
            style={Styles.button}
            onPress={UpdateProfileClicked}
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

export default UpdateProfileScreen;
