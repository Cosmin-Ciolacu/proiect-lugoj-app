import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Video } from "expo-av";

const Help = () => {
  return (
    <View style={styles.container}>
      <Video
        style={{ width: 500, height: 700 }}
        useNativeControls
        source={require("../../videos/video.mp4")}
      />
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
