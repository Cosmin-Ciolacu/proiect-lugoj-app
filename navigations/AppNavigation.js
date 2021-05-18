import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import HomeAdmin from "../screens/Admin/HomeAdmin";
import HomeUser from "../screens/User/HomeUser";
import Add from "../screens/User/Add";
import Details from "../screens/User/Details";
import Add2 from "../screens/User/Add2";
const Stack = createStackNavigator();

const AppNavigation = (props) => {
  const [accountType, setAccountType] = useState("");
  useEffect(() => {
    (async () => {
      const accountType = await AsyncStorage.getItem("accountType");
      console.log(accountType);
      setAccountType(accountType);
    })();
  }, []);
  let screens;
  if (accountType && accountType === "user") {
    screens = (
      <>
        <Stack.Screen name="HomeUser" component={HomeUser} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Add2" component={Add2} />
        <Stack.Screen name="Details" component={Details} />
      </>
    );
  } else {
    screens = <Stack.Screen name="HomeAdmin" component={HomeAdmin} />;
  }

  return <Stack.Navigator>{screens}</Stack.Navigator>;
};

/* const mapStateToProps = (state) => {
  return {
    user: { ...state.user },
  };
}; */

export default AppNavigation;
