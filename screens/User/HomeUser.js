import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../core/theme";
import PlusIcon from "../../components/PlusIcon";
const HomeUser = (props) => {
  return (
    <View style={styles.container}>
      <Text>HomeUser</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Add")}
        style={styles.floatingButton}
      >
        <PlusIcon />
      </TouchableOpacity>
    </View>
  );
};

export default HomeUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    zIndex: 999,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
