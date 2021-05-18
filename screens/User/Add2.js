import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import LocationIcon from "../../components/LocationIcon";
import Button from "../../components/Button";
import PhotoIcon from "../../components/PhotoIcon";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";
import { TextInput } from "react-native-paper";

const Add2 = () => {
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    (async () => {
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
    })();
  }, []);
  const getCameraImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        text1: "Nu se poate accesa galeria",
        type: "error",
        position: "bottom",
        visibilityTime: 2000,
      });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    setImage(result.uri);
  };

  const getImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        text1: "Nu se poate accesa galeria",
        type: "error",
        position: "bottom",
        visibilityTime: 2000,
      });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    setImage(result.uri);
    setVisible((prev) => !prev);
  };
  const save = () => {
    //save to db
  };
  return (
    <View style={styles.container}>
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
          <Marker
            coordinate={{ latitude: location.lat, longitude: location.lng }}
          />
        </MapView>
      )}
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => getCameraImage()}
          style={[styles.btnAdd, { backgroundColor: "black" }]}
        >
          <LocationIcon />
          <Text style={styles.btnText}>Fa o poza</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => getImage()}
          style={[styles.btnAdd, { backgroundColor: "#60AFF6" }]}
        >
          <PhotoIcon />
          <Text style={styles.btnText}>Adauga poza</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.obs}>
        <TextInput
          label="Observatii"
          placeholder="Introduceti mai multe detalii"
          multiline={true}
        />
      </View>
      <Button style={styles.saveBtn} mode="contained" onPress={() => save()}>
        Salveaza sesizarea
      </Button>

      <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
    </View>
  );
};

export default Add2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    /* alignItems: "center", */
    justifyContent: "center",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "flex-start",
    position: "absolute",
    top: 0,
  },
  btnAdd: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
  },
  btnText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
  map: {
    width: "100%",
    height: 250,
    position: "absolute",
    top: 0,
  },
  obs: {
    alignSelf: "flex-start",
    width: "100%",
    marginTop: "5%",
    /* justifyContent: "center",
    alignItems: "center", */
  },
  saveBtn: {
    position: "absolute",
    bottom: "10%",
  },
});
