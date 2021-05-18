import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/User/Home";
import Add from "../screens/User/Add";
import Details from "../screens/User/Details";

const Stack = createStackNavigator();
export default function AuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Add" component={Add} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
