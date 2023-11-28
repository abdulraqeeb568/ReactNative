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
import Spinner from "react-native-loading-spinner-overlay";
import { ListItem, SearchBar } from "react-native-elements";

const DriverHomeScreen = ({ navigation, route }) => {
  console.log("params" + JSON.stringify(route.params));
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const driversData = [
    {
      name: "shabalu",
      mobile: "0333223232",
      address: "Umar Kot",
    },

    {
      name: "jhaplu",
      mobile: "031111111",
      address: "Oggy's House",
    },
    {
      name: "taplu",
      mobile: "031111111",
      address: "Oggy's house",
    },
    {
      name: "baplu",
      mobile: "031111111",
      address: "Oggy's house",
    },
  ];
  useEffect(() => {
    //call API and bring drivers data
    setFilteredData(driversData);
    setIsLoading(false);
  }, []);
  const onSearchTextChange = (searchTerm) => {
    setSearchValue(searchTerm);
    const searchTermLower = searchTerm.toLowerCase();
    const data = driversData.filter((item) => {
      const name = item.name.toLowerCase();
      const address = item.address && item.address.toLowerCase();
      const mobile = item.address && item.mobile.toLowerCase();

      return (
        name.includes(searchTermLower) ||
        (item.hasOwnProperty("mobile") && mobile.includes(searchTermLower)) ||
        (item.hasOwnProperty("address") && address.includes(searchTermLower))
      );
    });
    setFilteredData(data);
    return filteredData;
  };
  const OnDriverSelection = (driver) => {};
  const driverHomeEvent = () => {
    navigation.navigate("DriverPage1");
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
        onChangeText={(text) => onSearchTextChange(text)}
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
            <TouchableWithoutFeedback onPress={() => OnDriverSelection(item)}>
              <View style={Styles.listItem}>
                <View style={Styles.listContent}>
                  <Text style={Styles.listItemFont}>{item.name}</Text>
                  <Text style={Styles.listItemFont}>{item.mobile}</Text>
                  <Text style={Styles.listItemFont}>{item.address}</Text>
                </View>
                <View style={Styles.listItemIconContainer}>
                  <Icon
                    name="angle-right"
                    style={Styles.listItemIcon}
                    onPress={() => {}}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
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

export default DriverHomeScreen;
