import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import HomeAdmin from "../screens/Admin/HomeAdmin";
import Home from "../screens/User/Home";
import Add from "../screens/User/Add";
import Details from "../screens/User/Details";
const Stack = createStackNavigator();

const AppNavigation = (props) => {
  const [accountType, setAccountType] = useState("");
  useEffect(() => {
    (async () => {
      const accountType = await AsyncStorage.getItem("accountType");
      setAccountType(accountType);
    })();
  }, []);
  return (
    <Stack.Navigator>
      {accountType === "user" && (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Add" component={Add} />
          <Stack.Screen name="Details" component={Details} />
        </>
      )}
      <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
    </Stack.Navigator>
  );
};

/* const mapStateToProps = (state) => {
  return {
    user: { ...state.user },
  };
}; */

export default AppNavigation;
