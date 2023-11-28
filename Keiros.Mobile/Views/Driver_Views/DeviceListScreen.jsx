import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Alert
} from "react-native";


const DeviceListScreen = ({navigation, route}) => {
  const onDeviceSelection = (device) => {
   console.log(device);
    navigation.navigate('DriverDeviceMapView', {device: device,username:route.params.username})
    
    };
    return(
    
         <View style={styles.container}>
     
    
      <StatusBar style="auto" /> 
      <FlatList
        data={route.params.devicelist}
        renderItem={({ item }) => {
          return (
            <>
            <TouchableWithoutFeedback onPress={() => onDeviceSelection(item)} >
            <Text>{item.device_name}</Text>
          </TouchableWithoutFeedback>
            
              
    
          
            </>
          );
        }}
        keyExtractor={item => item._id}
      />
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
  
  export default DeviceListScreen;