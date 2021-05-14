import { StatusBar } from "expo-status-bar";
import React from "react";
import Toast from "react-native-toast-message";
import { StyleSheet, Text, View } from "react-native";
import MainNavigation from "./navigations/MainNavigation";

export default function App() {
  return (
    <>
      <MainNavigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
