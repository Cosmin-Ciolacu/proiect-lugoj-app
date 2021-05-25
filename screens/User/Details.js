import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Title, Paragraph, Subheading } from "react-native-paper";
import moment from "moment";
import MapView, { Marker } from "react-native-maps";
import DoneIcon from "../../components/DoneIcon";
import CloseIcon from "../../components/CloseIcon";
import { theme } from "../../core/theme";
import axiosInstance from "../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Details = (props) => {
  const { problem } = props.route.params;
  const [isProblemVoted, setIsProblemVoted] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await axiosInstance.get("/main/is-voted/" + problem.id, {
        headers: {
          "auth-token": await AsyncStorage.getItem("token"),
        },
      });
      const data = res.data;
      console.log(data);
      setIsProblemVoted(data.isProblemVoted);
    })();
  }, [isProblemVoted]);
  const sendVote = async (vote) => {
    const res = await axiosInstance.post(
      "/main/vote",
      {
        problemId: problem.id,
        vote: vote,
      },
      {
        headers: {
          "auth-token": await AsyncStorage.getItem("token"),
        },
      }
    );
    const data = res.data;
    if (data.success === 1 && data.saved === 1) {
      //alert("ok");
      setIsProblemVoted(1);
      return;
    }
    if (data.voted === 1) return;
  };
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.cover} source={{ uri: problem.image }} />
      <View style={styles.infos}>
        <Title>Categorie: {problem.category}</Title>
        <Title>Subcategorie: {problem.subCategory}</Title>
        <Subheading>Sesizare facuta de: {problem.user?.username}</Subheading>
        <Subheading>
          Sesizare facuta in data de:{" "}
          {moment(problem.createdAt).format("DD MM YYYY hh:mm")}
        </Subheading>
        <Subheading>Observatii:</Subheading>
        <Paragraph>{problem.observations}</Paragraph>
        <Subheading>Locatie: </Subheading>
        <View style={styles.mapView}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: problem.lat,
              longitude: problem.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: problem.lat, longitude: problem.lng }}
            />
          </MapView>
        </View>
      </View>
      {!isProblemVoted && (
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => sendVote("Y")}
            style={[
              styles.floatingButton,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <DoneIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => sendVote("N")}
            style={[
              styles.floatingButton,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <CloseIcon />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    width: "100%",
    height: 300,
  },
  infos: {
    width: "100%",
    padding: 15,
  },
  mapView: {
    //marginTop: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: 200,
  },
  buttons: {
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  floatingButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
