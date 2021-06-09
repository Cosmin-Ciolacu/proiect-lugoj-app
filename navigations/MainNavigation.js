import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "../screens/Auth/Home";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import Welcome from "../screens/User/Welcome";
import HomeUser from "../screens/User/HomeUser";
import Add from "../screens/User/Add";
import Details from "../screens/User/Details";
import Add2 from "../screens/User/Add2";
import Map from "../screens/User/Map";
import Stats from "../screens/User/Stats";
import MyProblems from "../screens/User/MyProblems";
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
      {/*  {screens} */}
      <Stack.Navigator>
        {/* {token === null && (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )} */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="HomeUser" component={HomeUser} />
        <Stack.Screen name="MyProblems" component={MyProblems} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Add2" component={Add2} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Stats" component={Stats} />
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
