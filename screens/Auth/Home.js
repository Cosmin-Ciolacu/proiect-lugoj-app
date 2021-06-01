/* import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Button } from "react-native-paper";

export default function Home(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../Images/lugoj2.jpeg")}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>REPORT LUGOJ</Text>
          <Text style={styles.logoDescription}>
            Get your doze of daily news!
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => props.navigation.navigate("Login")}
          >
            AUTENTIFICARE
          </Button>
          <Button
            mode="contained"
            onPress={() => props.navigation.navigate("Register")}
            style={{ ...styles.btn, ...{ marginTop: 15, width: "80%" } }}
          >
            CREARE CONT
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    top: 0,
    left: 0,
    position: "absolute",
    zIndex: 999,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    opacity: 0.7,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: "20%",
  },
  logoText: {
    fontSize: 45,
    fontWeight: "600",
    color: "white",
  },
  logoDescription: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
    paddingTop: 20,
  },
  buttons: {
    width: "100%",
    marginBottom: "20%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 20,
  },
  btn: {
    width: "80%",
  },
});
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Logo />
      <Header>Report Lugoj</Header>
      <Button mode="contained" onPress={() => navigation.navigate("Login")}>
        AUTENTIFICARE
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate("Register")}>
        CREARE CONT
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
