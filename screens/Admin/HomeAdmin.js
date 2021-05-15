import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeAdmin = () => {
  return (
    <View style={styles.container}>
      <Text>HomeAdmin</Text>
    </View>
  );
};

export default HomeAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
