import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import axiosInstance from "../../axios";
import LoadingScreen from "../../components/LoadingScreen";
import MapView, { Marker } from "react-native-maps";
import { getIconByCategoryName } from "../../core/categories";
import * as Location from "expo-location";

const Map = () => {
  const [locations, setLocations] = useState([]);
  const [loadingObject, setLoadingObject] = useState({
    loading: false,
    text: "",
  });
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      setLoadingObject({
        loading: true,
        text: "Se incarca harta",
      });
      const res = await axiosInstance.get("/main/locations", {
        headers: {
          "auth-token": await AsyncStorage.getItem("token"),
        },
      });
      const data = res.data;
      const locations = data.locations;
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          text1: "Nu se poate lua locatia curenta",
          type: "error",
          position: "bottom",
          visibilityTime: 2000,
        });
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      //console.log(locations);
      setLocations(locations);
      setLoadingObject({
        loading: false,
        text: "",
      });
    })();
  }, []);
  return (
    <View>
      {loadingObject.loading && (
        <LoadingScreen
          loading={loadingObject.loading}
          text={loadingObject.text}
        />
      )}
      {location != null && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {locations.map((loc) => (
            <Marker
              coordinate={{
                latitude: loc.lat,
                longitude: loc.lng,
              }}
            >
              <Image
                source={getIconByCategoryName(loc.category)}
                style={{ with: 25, height: 25 }}
              />
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
