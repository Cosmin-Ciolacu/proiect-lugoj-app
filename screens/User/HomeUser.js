import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../core/theme";
import PlusIcon from "../../components/PlusIcon";
import axiosInstance from "../../axios";
import LoadingScreen from "../../components/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProblemCard from "../../components/ProblemCard";
import Button from "../../components/Button";

const HomeUser = (props) => {
  const [problems, setProblems] = useState([]);
  const [loadingObject, setLoadingObject] = useState({
    loading: false,
    text: "",
  });
  const [skip, setSkip] = useState(0);
  const [take] = useState(3);
  const [showMore, setShowMore] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoadingObject({
          loading: true,
          text: "Se incarca datele",
        });
        const res = await axiosInstance.get("/main/problems", {
          headers: {
            "auth-token": await AsyncStorage.getItem("token"),
          },
          params: {
            skip: skip,
            take: take,
          },
        });
        const data = res.data;
        console.log(res.data);
        if (data.success === 1) {
          setLoadingObject({
            loading: false,
            text: "",
          });
          if (data.problems.length === 0) {
            setShowMore(false);
            setLoadingObject({
              loading: false,
              text: "",
            });
            return;
          }
          setProblems((prev) => prev.concat(data.problems));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [skip, props.navigation]);
  const goToDetails = (problem) =>
    props.navigation.navigate("Details", {
      problem,
    });
  return (
    <View style={styles.container}>
      {loadingObject.loading && (
        <LoadingScreen
          loading={loadingObject.loading}
          text={loadingObject.text}
        />
      )}
      <ScrollView>
        {problems.map((problem, i) => (
          <ProblemCard goToDetails={goToDetails} problem={problem} key={i} />
        ))}
        {showMore && (
          <Button
            style={styles.saveBtn}
            mode="contained"
            onPress={() => setSkip((prev) => prev + 2)}
          >
            <Text>Vezi mai multe </Text>
          </Button>
        )}
      </ScrollView>
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
    padding: 15,
    width: "100%",
    height: "100%",
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
