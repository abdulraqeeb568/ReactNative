import { StatusBar } from "expo-status-bar";
import React, { useState, useLayoutEffect } from "react";
import * as Constants from "../../Commons/Constants";
import { Styles } from "../../Commons/Styles";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import * as Functions from "../../Commons/Functions";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [responseMsg, setResponseMsg] = useState(true);
  const [isErrorOccurred, setIsErrorOccurred] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Forgot Password",
    });
  }, [navigation]);

  const handleEmail = (value) => {
    if (value.trim() === "") {
      setIsValidEmail(true);
      setIsEmail(false);
    } else {
      setEmail(value);
      setIsValidEmail(Functions.isValidEmail(value));
      setIsEmail(true);
    }
  };
  const ResetPasswordPressed = async () => {
    if (!email) {
      return setIsEmail(false);
    }
    if (!isValidEmail) return;
    setIsLoading(true);
    const instance = axios.create({
      validateStatus: function (status) {
        // Treat 404 as a valid response
        return (status >= 200 && status < 300) || status === 404;
      },
    });
    const result = await instance
      .post(Constants.ForgotPassword + email)
      .then((res) => {
        console.log(JSON.stringify(res));
        res.data.returnValue === 200
          ? setIsErrorOccurred(false)
          : setIsErrorOccurred(true);
        if (res.data.returnValue === 200 || res.data.returnValue === 404) {
          setResponseMsg(res.data.returnMessage);
        } else if (res.data.returnValue === 500) {
          setResponseMsg("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsErrorOccurred(true);
        setResponseMsg("Something went wrong");
      });
    setIsLoading(false);
  };

  return (
    <View style={Styles.container}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={Styles.spinnerTextStyle}
        color="black"
      />
      <View style={Styles.header}>
        <Image
          style={Styles.logoImage}
          source={require("../..//assets/ic_elit_logo.png")}
        />
      </View>
      <View style={{ flex: 1, width: "95%" }}>
        <Text
          style={{
            color: "#343541",
            fontSize: 15,
            textAlign: "center",
            marginVertical: 10,
          }}
        >
          {Constants.PasswordRecoveryText}
        </Text>
        <View style={Styles.inputField}>
          <TextInput
            style={Styles.TextInput}
            placeholder="Email Address"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => handleEmail(email)}
          />
        </View>
        {!isValidEmail && (
          <Text style={Styles.invalidText}>Email is invalid</Text>
        )}
        {!isEmail && (
          <Text style={Styles.invalidText}>Email field is required</Text>
        )}
        <TouchableOpacity style={Styles.button} onPress={ResetPasswordPressed}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Send
          </Text>
        </TouchableOpacity>
        <Text style={isErrorOccurred ? Styles.invalidText : Styles.validText}>
          {responseMsg}
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default ForgotPasswordScreen;
