import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatGrid } from "react-native-super-grid";
import { theme } from "../../core/theme";
const Welcome = (props) => {
  const [username, setUsername] = useState("");
  const [items, setItems] = useState([
    {
      text: "Adauga sesizare",
      icon: require("../../Images/plus.png"),
      pressFn: () => props.navigation.navigate("Add"),
    },
    {
      text: "Harta",
      icon: require("../../Images/worldwide.png"),
      pressFn: () => props.navigation.navigate("Map"),
    },
    {
      text: "Sesizarile din oras",
      icon: require("../../Images/buildings.png"),
      pressFn: () => props.navigation.navigate("HomeUser"),
    },
    {
      text: "Sesizarile mele",
      icon: require("../../Images/profile.png"),
      pressFn: () => console.log("sesizarile mele "),
    },
    {
      text: "Ajutor",
      icon: require("../../Images/help.png"),
      pressFn: () => console.log("help"),
    },
    {
      text: "Deconectare",
      icon: require("../../Images/logout-2.png"),
      pressFn: async () => {
        await AsyncStorage.clear();
        props.navigation.navigate("Home");
      },
    },
  ]);
  useEffect(() => {
    (async () => {
      if ((await AsyncStorage.getItem("token")) === null) {
        props.navigation.navigate("Home");
        return;
      }
      const username = await AsyncStorage.getItem("username");
      setUsername(username);
    })();
  }, []);
  return (
    <View style={{ backgroundColor: "white" }}>
      <View
        style={{
          marginTop: 60,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 40,
            textAlign: "center",
            color: theme.colors.primary,
          }}
        >
          Bine ai venit {username}
        </Text>
      </View>
      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => item.pressFn()}
            style={styles.itemContainer}
          >
            <Image style={styles.itemImage} source={item.icon} />
            <Text style={styles.itemName}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: "30%",
    //flex: 1,
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: theme.colors.primary,
    borderRadius: 65,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 20,
    marginTop: 8,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
  },
});

export default Welcome;
