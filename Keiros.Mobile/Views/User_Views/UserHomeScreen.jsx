import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Styles } from "../../Commons/Styles";
import AwesomeAlert from "react-native-awesome-alerts";
import Spinner from "react-native-loading-spinner-overlay";
import { ListItem, SearchBar } from "react-native-elements";
import * as Constants from "../../Commons/Constants";
import * as WebRequests from "../../WebRequest";

const UserHomeScreen = ({ navigation, route }) => {
  console.log("params" + JSON.stringify(route.params.params));
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertButtonColor, setAlertButtonColor] = useState("green");
  const [searchValue, setSearchValue] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertText, setAlertText] = useState("");
  const [isShowConfirm, setIsShowConfirm] = useState(true);
  const deviceData = [
    {
      name: "device outdoor",
      id: "0333223232",
    },

    {
      name: "device cheecha watni",
      id: "0332111112",
    },
    {
      name: "device gulberg",
      id: "0331111113",
    },
    {
      name: "device indoor",
      id: "0330111114",
    },
  ];
  const handleDeletePress = (id) => {
    setItemToDelete(id);
    alertBox("Delete!", Constants.DeleteConfirmationText + "device?", true);
  };
  const alertBox = (title, alertText, isShowConfirm) => {
    title === "Success!"
      ? setAlertButtonColor("green")
      : setAlertButtonColor("#DD6B55");
    setIsShowConfirm(isShowConfirm);
    setIsShowAlert(true);
    setAlertTitle(title);
    setAlertText(alertText);
  };
  const handleDeleteAction = (id) => {
    WebRequests.deleteDevice(id)
      .then((response) => {
        console.log(JSON.stringify(response));
        setIsLoading(false);
        if (response.isErrorOccurred) {
          //This error is caused by an exception while executing axios request
          alertBox("Error!", response.errorMessage, false);
        } else {
          response.result.isErrorOccured
            ? alertBox("Error!", response.result.returnMessage, false)
            : alertBox("Success!", "Device deleted successfully", false);
        }
      })
      .catch((err) => {
        console.log("err" + err);
        setIsLoading(false);
        alertBox("Error!", err);
      });
  };
  useEffect(() => {
    //call API and bring device data
    setFilteredData(deviceData);
    setIsLoading(false);
  }, []);
  const handleSearchTextChange = (searchTerm) => {
    setSearchValue(searchTerm);
    const searchTermLower = searchTerm.toLowerCase();
    const data = deviceData.filter((item) => {
      const name = item.name.toLowerCase();
      const id = item.id && item.id.toLowerCase();

      return (
        name.includes(searchTermLower) ||
        (item.hasOwnProperty("id") && id.includes(searchTermLower))
      );
    });
    setFilteredData(data);
    return filteredData;
  };
  const handleDeviceSelection = (device) => {};
  const userHomeEvent = () => {
    navigation.navigate("UserPage1");
  };
  const listItem = () => {
    return <View></View>;
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Here..."
        lightTheme
        value={searchValue}
        onChangeText={(text) => handleSearchTextChange(text)}
        autoCorrect={false}
        containerStyle={{
          width: "100%",
          paddingHorizontal: 0,
        }}
      />
      {/* <StatusBar style="auto" /> */}
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={Styles.spinnerTextStyle}
        color="black"
      />
      <FlatList
        data={filteredData}
        style={{ width: "100%" }}
        renderItem={({ item }) => {
          return (
            <View style={Styles.listItem}>
              <TouchableOpacity
                onPress={() => handleDeviceSelection(item)}
                style={Styles.listContent}
              >
                <Text style={Styles.listItemFont}>{item.name}</Text>
                <Text style={Styles.listItemFont}>{item.id}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.listItemIconContainer}>
                <Icon
                  name="trash"
                  key={item.id}
                  style={Styles.listItemIcon}
                  onPress={() => {
                    handleDeletePress(item.id);
                  }}
                />
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
                showConfirmButton={isShowConfirm}
                cancelText="Cancel"
                cancelButtonColor="green"
                confirmButtonColor="red"
                onCancelPressed={() => {
                  setIsShowAlert(false);
                }}
                onConfirmPressed={() => {
                  handleDeleteAction(itemToDelete);
                }}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E1E8EE",
    paddingHorizontal: 10,
  },
});

export default UserHomeScreen;
