import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,

} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

const DriverDeviceMapView = ({navigation,route}) => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCO_6Xp-fB-O3FbxFoJztLRRAFfhglZz40';
  const [mapRegion, setmapRegion] = useState({
    latitude: parseFloat(route.params.device.device_lat),
    longitude:parseFloat(route.params.device.device_long) ,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [driverLocation, setDriverLocation] = useState({
    latitude: 37.3359,
    longitude:  -121.9995,

  });
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location.coords);
      setDriverLocation({
        latitude: location.coords.latitude,
        longitude:  location.coords.longitude,

      });
    })();
  }, []);
    return(
    
      <MapView style={styles.map} 
      initialRegion={{
        latitude: parseFloat(driverLocation.latitude),
        longitude:parseFloat(driverLocation.longitude) ,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      followsUserLocation={true}
>
<MapViewDirections
    origin={driverLocation}
    destination={ mapRegion}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
  />

<Marker coordinate={mapRegion} title={route.params.device.device_name} />
<Marker coordinate={driverLocation} title={route.params.username} />
      </MapView>
    
    
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });
  
  export default DriverDeviceMapView;