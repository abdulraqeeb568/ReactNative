import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Alert } from "react-native/Libraries/Alert/Alert";
import Icon from "react-native-vector-icons/FontAwesome5";
import NetInfo from "@react-native-community/netinfo";
import * as Functions from "../Commons/Functions";
import { Styles } from "../Commons/Styles";
import Constants from "../Commons/Constants";
import Spinner from "react-native-loading-spinner-overlay";
import PhoneInput from "react-native-phone-number-input";
import AwesomeAlert from "react-native-awesome-alerts";
// import PhoneInput from "react-native-phone-input";
import * as WebRequests from "../WebRequest";
import CountryPicker from "react-native-country-picker-modal";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import PhoneInputWrapper from "./PhoneInputWrapper";
// import CountryPickerWrapper from "./CountryPickerWrapper";
// import { CountryPicker } from "react-native-country-codes-picker";

const SignUpScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [formattedNumber, setFormattedNumber] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isNumber, setIsNumber] = useState(true);
  const [isRole, setIsRole] = useState(true);
  const [isName, setIsName] = useState(true);
  const [isAddress, setIsAddress] = useState(true);
  const [isProfilePic, setIsProfilePic] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isNetworkConnected, setIsNetworkConnected] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [error, setError] = useState({});
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState("Image");
  const [role, setRole] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertText, setAlertText] = useState("");
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertButtonColor, setAlertButtonColor] = useState("green");
  let [confirmPassword, setConfirmPassword] = useState("");
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

  const phoneInputRef = useRef();
  const countryPickerRef = useRef();
  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [cca2, setCca2] = useState("us");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Sign up",
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

  const handlePassword = (value) => {
    if (value) setIsPassword(true);
    else {
      setIsPassword(false);
      return setIsValidPassword(true);
    }
    setIsValidPassword(Functions.isValidPassword(value));
    setPassword(value);
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

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera  
                 roll permission to upload images.`
      );
    } else {
      // Launch the image library and get
      // the selected image
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        // If an image is selected (not cancelled),
        // update the file state variable
        setProfilePicture(result.assets[0].uri);

        // Clear any previous errors
        setError({
          isError: false,
          errorMessage: null,
          returnedValue: null,
        });
      }
    }
  };

  const alertBox = (title, alertText) => {
    title === "Success!"
      ? setAlertButtonColor("green")
      : setAlertButtonColor("#DD6B55");
    setIsShowAlert(true);
    setAlertTitle(title);
    setAlertText(alertText);
  };
  const handleConfirmPassword = (value) => {
    setIsValidConfirmPassword(Functions.isValidPassword(value));
    setConfirmPassword(value);
    password === value
      ? setIsPasswordMatched(true)
      : setIsPasswordMatched(false);
  };
  const signUpPressed = async () => {
    !email ? setIsEmail(false) : setIsEmail(true);
    !password ? setIsPassword(false) : setIsPassword(true);
    !number ? setIsNumber(false) : setIsNumber(true);
    !role ? setIsRole(false) : setIsRole(true);
    !profilePicture ? setIsProfilePic(false) : setIsProfilePic(true);
    !name ? setIsName(false) : setIsName(true);
    !address ? setIsAddress(false) : setIsAddress(true);

    if (
      !email ||
      !password ||
      !number ||
      !role ||
      !profilePicture ||
      !name ||
      !address ||
      !isPasswordMatched
    )
      return;

    let isConnected = true;
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
        return;
      }
      await CreateUser();
    } else {
      setIsNetworkConnected(false);
      setIsLoading(false);
    }
  };
  const CreateUser = async () => {
    setError({
      isErrorOccurred: true,
      errorMessage: null,
      returnedValue: null,
    });
    let userModel = {
      name: name,
      email: email,
      password: password,
      profileImage: profilePicture,
      address: address,
      mobile: formattedNumber,
      role: 2,
    };
    WebRequests.createUser({ userModel: userModel })
      .then((response) => {
        setIsLoading(false);
        if (response.isErrorOccurred) {
          //This error is caused by an exception while executing axios request
          alertBox("Error!", response.errorMessage);
        } else {
          response.result.isErrorOccured
            ? alertBox("Error!", response.result.returnMessage)
            : alertBox("Success!", "User Created successfully");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        alertBox("Error!", err);
      });
  };

  return (
    <View style={Styles.container}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={Styles.spinnerTextStyle}
        color="black"
      />
      {!isKeyboardVisible && (
        <View style={styles.headerSignUp}>
          <Image
            style={Styles.logoImage}
            source={require("..//assets/ic_elit_logo.png")}
          />
        </View>
      )}
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
      >
        <View style={styles.bodyContainer}>
          <View
            style={[Styles.inputField, !isName ? { borderColor: "red" } : null]}
          >
            <TextInput
              style={styles.TextInput}
              placeholder="Name"
              onChangeText={(value) => {
                setName(value);
              }}
            />
          </View>
          <View
            style={[
              Styles.inputField,
              !isValidEmail || !isEmail ? { borderColor: "red" } : null,
            ]}
          >
            <TextInput
              style={styles.TextInput}
              placeholder="Email Address"
              onChangeText={(email) => {
                handleEmail(email);
              }}
            />
          </View>
          {!isValidEmail && (
            <Text style={{ color: "red" }}>Email is invalid</Text>
          )}
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
            containerStyle={[
              Styles.phoneNumberContainer,
              !isNumber ? { borderColor: "red" } : null,
            ]}
            textContainerStyle={{
              backgroundColor: "transparent",
            }}
            flagButtonStyle={{ width: 50, backgroundColor: "transparent" }}
          />
          <View
            style={[
              Styles.inputField,
              !isAddress ? { borderColor: "red" } : null,
            ]}
          >
            <TextInput
              style={styles.TextInput}
              placeholder="Address"
              onChangeText={(value) => {
                setAddress(value);
              }}
            />
          </View>

          <View
            style={[
              Styles.ViewUploadImage,
              !isRole ? { borderColor: "red" } : null,
            ]}
          >
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              <Text style={{ fontSize: 16, color: "gray" }}>Select Role</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              <SelectDropdown
                data={Constants.Roles}
                defaultButtonText={"Select Role"}
                onSelect={(selectedItem, index) => {
                  //API Role=1->Admin
                  //API Role=2->User
                  //API Role=3->Driver
                  selectedItem === Constants.Roles[0] ? setRole(3) : setRole(2);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={"white"}
                      size={18}
                    />
                  );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
              />
            </View>
          </View>

          <View
            style={[
              Styles.ViewUploadImage,
              !isProfilePic ? { borderColor: "red" } : null,
            ]}
          >
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              {profilePicture ? (
                <Image
                  source={{ uri: profilePicture }}
                  style={{ width: 40, height: 40 }} // Adjust the width and height as needed
                />
              ) : (
                <Text style={{ fontSize: 16, color: "gray" }}>
                  Profile Picture
                </Text>
              )}
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Text style={{ color: "white", fontSize: 16 }}>
                  Choose Image
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[
              Styles.ViewUpdatePassword,
              !isValidPassword || !isPassword ? { borderColor: "red" } : null,
            ]}
          >
            <View style={styles.passwordInputView}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
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
          <View
            style={[
              Styles.ViewUpdatePassword,
              !isValidPassword || !isPassword ? { borderColor: "red" } : null,
            ]}
          >
            <View style={styles.passwordInputView}>
              <TextInput
                style={Styles.TextInputPasswordUpdate}
                placeholder="Confirm Password"
                placeholderTextColor="gray"
                onChangeText={(confirmPassword) =>
                  handleConfirmPassword(confirmPassword)
                }
                secureTextEntry={hideConfirmPass ? true : false}
              />
            </View>
            <View style={styles.passwordIconView}>
              <Icon
                name={hideConfirmPass ? "eye-slash" : "eye"}
                onPress={() => setHideConfirmPass(!hideConfirmPass)}
              />
            </View>
          </View>
          {!isPasswordMatched && (
            <Text style={Styles.invalidText}>
              {Constants.PasswordMisMatchedText}
            </Text>
          )}
          {isValidEmail && isValidPassword && !isNetworkConnected && (
            <Text style={Styles.invalidText}>
              {Constants.NetworkConnectionText}
            </Text>
          )}
          <TouchableOpacity style={Styles.button} onPress={signUpPressed}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <AwesomeAlert
        show={isShowAlert}
        showProgress={false}
        title={alertTitle}
        message={alertText}
        messageStyle={{ textAlign: "center" }}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Close"
        cancelButtonColor={alertButtonColor}
        onCancelPressed={() => {
          setIsShowAlert(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  dropdownsRow: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: "5%",
  },

  dropdown1BtnStyle: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 10,
    height: 40,
    backgroundColor: "#4165AE",
    marginRight: 30,
  },
  dropdown1BtnTxtStyle: { color: "white", fontSize: 16 },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
  header: {
    maxHeight: "40%",
    backgroundColor: "yellow",
  },
  body: {
    flex: 4,
    //backgroundColor: 'darkorange'
  },
  bodyContainer: {
    width: "95%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
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
  phoneNumberSignUp: {
    width: "100%",
    backgroundColor: "transparent",
  },
  textSignUp: {
    backgroundColor: "transparent",
  },
  inputView: {
    borderRadius: 30,
    width: "90%",
    height: 60,
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
    borderRadius: 30,
    width: "90%",
    height: 60,
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
    height: 60,
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
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,

    backgroundColor: "#4165AE",
  },
  signUpLink: {
    color: "red",
  },
  imageButton: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginLeft: 30,
    backgroundColor: "#4165AE",
  },
  profilePictureView: {
    borderRadius: 10,
    height: 60,
    width: "100%",
    alignContent: "space-between",
    borderWidth: 3,
    borderColor: "#4165AE",
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "yellow",
  },
  headerSignUp: {
    height: "20%",
    margin: 0,
    passing: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SignUpScreen;
