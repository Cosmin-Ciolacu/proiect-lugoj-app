import { StatusBar } from "expo-status-bar";
import React from "react";
import Toast from "react-native-toast-message";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./store/reducer";
import { StyleSheet, Text, View } from "react-native";
import MainNavigation from "./navigations/MainNavigation";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
