import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";


const UserPage2 = ({navigation}) => {
    return(
    
         <View style={styles.container}>
      <Text>This is User Page 2</Text>
    
      <StatusBar style="auto" /> 
      
    </View>
    
    
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    }
  });
  
  export default UserPage2;