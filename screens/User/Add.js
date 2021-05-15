import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Add = () => {
  return (
    <View style={styles.container}>
      <Text>Add</Text>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
