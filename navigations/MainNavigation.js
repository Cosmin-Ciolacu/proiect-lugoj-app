import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Auth/Home";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppNavigation from "./AppNavigation";

const Stack = createStackNavigator();

export default function MainNavigation() {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await AsyncStorage.getItem("userInfo");
      setUserInfo(JSON.parse(userInfo));
    }
    getUserInfo();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userInfo != null ? "App" : "Home"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="App" component={AppNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
