import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "../screens/Auth/Home";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import AppNavigation from "./AppNavigation";

const Stack = createStackNavigator();

const MainNavigation = (props) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      setToken(token);
    })();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token === null && (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
        <Stack.Screen name="App" component={AppNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/* const mapStateToProps = (state) => {
  return {
    user: { ...state.user },
  };
}; */

export default MainNavigation;
