import React, { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity,Text } from 'react-native';
import * as Location from "expo-location";
import { Camera, CameraType } from "expo-camera";

const initialRegion = {
  latitude: 49.2576508,
  longitude: -123.2639868,
  latitudeDelta: 100,
  longitudeDelta: 100,
};

export default function App() {
  const [region, setRegion] = useState();
  const [loading, setLoading] = useState(false);

  const getCurrentPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Ops!", "Permissão de acesso a localização negada.");
    }

    let {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    setRegion({ latitude, longitude, latitudeDelta: 100, longitudeDelta: 100 });
    setLoading(true);
  };

  useEffect(() => {
      getCurrentPosition();
  }, []);

  return (
      <>
        {loading &&(
          <View style={styles.container}>
            <MapView style={styles.map} 
              region={region}>
                <Marker coordinate={{
                latitude:Number(region.latitude),
                longitude:Number(region.longitude)}}
                title="You"
              />
            </MapView>
          </View>
        )}
        <View style={styles.camera}>
            <Camera type={CameraType.back}>
            </Camera>
        </View>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  camera:{
    flex:1
  }
});