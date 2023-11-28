// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import SignInScreen from "./Views/SignIn";
import SignUpScreen from "./Views/SignUp";
import DriverHomeScreen from "./Views/Driver_Views/DriverHomeScreen";
import DeviceListScreen from "./Views/Driver_Views/DeviceListScreen";
import DriverDeviceMapView from "./Views/Driver_Views/DriverDeviceMapView";
import DriverPage3 from "./Views/Driver_Views/DriverPage3";
import ForgotPasswordScreen from "./Views/Commons/ForgotPasswordScreen";
import UpdateProfileScreen from "./Views/Commons/UpdateProfileScreen";
import SettingsScreen from "./Views/Commons/SettingsScreen";
import MyTabs from "./Views/Commons/TabBar";

import UserHomeScreen from "./Views/User_Views/UserHomeScreen";
import UserPage1 from "./Views/User_Views/UserPage1";
import UserPage2 from "./Views/User_Views/UserPage2";
import UserPage3 from "./Views/User_Views/UserPage3";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UpdatePasswordScreen from "./Views/Commons/UpdatePasswordScreen";
import HelpScreen from "./Views/Commons/HelpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" /> */}

    // </View>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DriverHome"
          component={DriverHomeScreen}
        />
        <Stack.Screen name="DeviceListScreen" component={DeviceListScreen} />
        <Stack.Screen
          name="DriverDeviceMapView"
          component={DriverDeviceMapView}
        />
        <Stack.Screen name="DriverPage3" component={DriverPage3} />

        <Stack.Screen
          options={{ headerShown: false }}
          name="UserHome"
          component={UserHomeScreen}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="HelpScreen" component={HelpScreen} />
        <Stack.Screen
          name="UpdateProfileScreen"
          component={UpdateProfileScreen}
        />
        <Stack.Screen
          name="UpdatePasswordScreen"
          component={UpdatePasswordScreen}
        />
        <Stack.Screen
          name="Dashboard"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

        <Stack.Screen name="UserPage1" component={UserPage1} />
        <Stack.Screen name="UserPage2" component={UserPage2} />
        <Stack.Screen name="UserPage3" component={UserPage3} />
      </Stack.Navigator>
    </NavigationContainer>
    //<SignIn/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
