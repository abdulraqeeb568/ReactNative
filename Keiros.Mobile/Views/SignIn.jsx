import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Icon from "react-native-vector-icons/FontAwesome5";
import NetInfo from "@react-native-community/netinfo";
import * as Functions from "../Commons/Functions";
import { Styles } from "../Commons/Styles";
import Constants from "../Commons/Constants";
import Spinner from "react-native-loading-spinner-overlay";
import * as WebRequests from "../WebRequest";
const SignInScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isNetworkConnected, setIsNetworkConnected] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [error, setError] = useState({
    isError: false,
    errorMessage: null,
    returnedValue: null,
  });

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPasswordScreen");
  };
  const handleUpdateProfile = () => {
    navigation.navigate("UpdateProfileScreen");
  };
  const handleUpdatePassword = () => {
    navigation.navigate("UpdatePasswordScreen");
  };
  const handleHelp = () => {
    navigation.navigate("HelpScreen");
  };
  const handleSettings = () => {
    navigation.navigate("SettingsScreen");
  };
  const handlePassword = (value) => {
    if (value) setIsPassword(true);
    else {
      setIsPassword(false);
      return setIsValidPassword(true);
    }
    setIsValidPassword(Functions.isValidPassword(value));
    setPassword(value);
  };
  const handleSignUpPressed = () => {
    navigation.navigate("SignUpScreen");
  };
  const handleEmail = (value) => {
    if (value) setIsEmail(true);
    else {
      setIsEmail(false);
      return setIsValidEmail(true);
    }
    setIsValidEmail(Functions.isValidEmail(value));
    setEmail(value);
  };
  const signInPressed = async () => {
    setError({
      isError: false,
      errorMessage: null,
      returnedValue: null,
    });
    if (!email) setIsEmail(false);
    if (!password) setIsPassword(false);
    if (!email || !password) return;

    let isConnected = false;
    setIsLoading(true);

    const internetCheckPromise = new Promise((resolve) => {
      const handleConnectivityChange = (state) => {
        resolve(state.isConnected); // Resolve the promise with the value
      };
      NetInfo.addEventListener(handleConnectivityChange); //Unsubscribing the event listener
    });

    // Await the Promise
    isConnected = await internetCheckPromise;
    if (isConnected) {
      setIsNetworkConnected(true);
      if (!isValidEmail || !isValidPassword) {
        setIsLoading(false);
        return;
      }
      await UserAuthentication();
    } else {
      setIsNetworkConnected(false);
      setIsLoading(false);
    }
  };
  const UserAuthentication = async () => {
    WebRequests.login(email, password)
      .then((response) => {
        console.log(JSON.stringify(response));
        if (response.isErrorOccurred) {
          setIsLoading(false);
          //This error is caused by an exception while executing axios request
          return setError({
            isError: true,
            errorMessage: response.errorMessage,
            returnedValue: null,
          });
        }
        if (response.result.returnValue === 200) {
          if (response.result.returnObject.role == "Admin") {
            navigation.navigate("Dashboard", {
              role: response.result.returnObject.role,
              name: response.result.returnObject.name,
              email: response.result.returnObject.email,
            });
          } // else if (response.result.returnObject.role == "User") {
          //   navigation.navigate("UserHome", {
          //     name: response.result.returnObject.email,
          //   });
          //   setIsLoading(false);
          // }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError({
          isError: true,
          errorMessage: "Something went wrong!",
          returnedValue: null,
        });
      });
  };
  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={Styles.spinnerTextStyle}
        color="black"
      />
      <View style={styles.header}>
        <Image
          style={{ resizeMode: "center", maxHeight: "100%", width: "100%" }}
          source={require("..//assets/ic_elit_logo.png")}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.bodyContainer}>
          <Text style={{ fontSize: 28, fontWeight: "bold" }}> Sign In </Text>
          <View
            style={[
              styles.inputView,
              !isValidEmail || !isEmail ? { borderColor: "red" } : null,
            ]}
          >
            <TextInput
              style={styles.TextInput}
              placeholder="Email Address"
              placeholderTextColor="#003f5c"
              onChangeText={(email) => {
                handleEmail(email);
              }}
            />
          </View>
          {!isValidEmail && (
            <Text style={{ color: "red" }}>Email is invalid</Text>
          )}
          <View
            style={[
              styles.mainPasswordView,
              !isValidPassword || !isPassword ? { borderColor: "red" } : null,
            ]}
          >
            <View style={styles.passwordInputView}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={hidePass ? true : false}
                onChangeText={(password) => {
                  handlePassword(password);
                }}
              />
            </View>
            <View style={styles.passwordIconView}>
              <Icon
                name={hidePass ? "eye-slash" : "eye"}
                onPress={() => setHidePass(!hidePass)}
              />
            </View>
          </View>

          {!isValidPassword && (
            <Text style={Styles.invalidText}>
              {Constants.InvalidPasswordText}
            </Text>
          )}
          {isValidEmail && isValidPassword && !isNetworkConnected && (
            <Text style={Styles.invalidText}>
              {Constants.NetworkConnectionText}
            </Text>
          )}
          {isValidEmail &&
            isValidPassword &&
            isNetworkConnected &&
            error.isError && (
              <Text style={Styles.invalidText}>
                {JSON.stringify(error.errorMessage)}
              </Text>
            )}
          <TouchableOpacity style={styles.loginBtn} onPress={signInPressed}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Sign in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUpdatePassword}>
            <Text style={styles.forgot_button}>Update Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUpdateProfile}>
            <Text style={styles.forgot_button}>Update Profile?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHelp}>
            <Text style={styles.forgot_button}>Help?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSettings}>
            <Text style={styles.forgot_button}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Dashboard", {
                role: "Driver",
                name: "Name",
                email: "email@gmail.com",
              });
            }}
          >
            <Text style={styles.forgot_button}>Tabs</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer} />
      <View style={styles.footerInnerView}>
        <Text style={{ color: "#0B0B0B" }}>New here?</Text>
        <TouchableOpacity onPress={handleSignUpPressed}>
          <Text style={styles.signUpLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    flex: 1.8,
  },
  body: {
    flex: 4,
    //backgroundColor: 'darkorange'
  },
  bodyContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",

    flexDirection: "column",
  },
  footer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "baseline",
    height: "100%",
  },
  footerInnerView: {
    backgroundColor: "#F6F5FA",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    borderRadius: 10,
    width: "90%",
    height: 50,
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#4165AE",
    marginTop: 10,
  },
  TextInput: {
    height: 55,
    fontSize: 18,
    padding: 10,
  },
  mainPasswordView: {
    borderRadius: 10,
    width: "90%",
    height: 50,

    borderWidth: 3,
    borderColor: "#4165AE",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passwordInputView: {
    width: "90%",
  },
  passwordInput: {
    height: 55,
    fontSize: 18,
    padding: 10,
  },
  passwordIconView: {
    width: "10%",
  },
  passwordIcon: {},
  forgot_button: {
    height: 30,
    marginTop: 10,
    fontSize: 18,
    color: "#0B0B0B",
  },
  loginBtn: {
    width: "90%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,

    backgroundColor: "#4165AE",
  },
  signUpLink: {
    color: "red",
  },
});
export default SignInScreen;
