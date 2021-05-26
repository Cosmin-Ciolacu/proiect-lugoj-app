import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import { Title } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatGrid } from "react-native-super-grid";
import { theme } from "../../core/theme";
const Welcome = () => {
  const [username, setUsername] = useState("");
  const [items, setItems] = useState([
    { text: "Adauga sesizare", icon: require("../../Images/plus.png") },
    {
      text: "Sesizarile din oras",
      icon: require("../../Images/buildings.png"),
    },
    { text: "Sesizarile mele", icon: require("../../Images/profile.png") },
    { text: "Deconectare", icon: require("../../Images/logout-2.png") },
  ]);
  useEffect(() => {
    (async () => {
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
          <View style={styles.itemContainer}>
            <Image style={styles.itemImage} source={item.icon} />
            <Text style={styles.itemName}>{item.text}</Text>
          </View>
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
  },
  itemImage: {
    width: 50,
    height: 50,
  },
});

export default Welcome;
