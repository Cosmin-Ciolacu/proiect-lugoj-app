import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Picker,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../core/theme";
import PlusIcon from "../../components/PlusIcon";
import axiosInstance from "../../axios";
import LoadingScreen from "../../components/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProblemCard from "../../components/ProblemCard";
import Button from "../../components/Button";
import { convertStatus } from "../../core/utils";

const MyProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loadingObject, setLoadingObject] = useState({
    loading: false,
    text: "",
  });
  const [skip, setSkip] = useState(0);
  const [take] = useState(3);
  const [showMore, setShowMore] = useState(true);
  const [status, setStatus] = useState("");
  useEffect(() => {
    (async () => {
      try {
        setProblems([]);
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
            userProblems: true,
            status: status,
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
  }, [skip, status]);
  const goToDetails = (problem) =>
    props.navigation.navigate("Details", {
      problem,
    });
  return (
    <View>
      <View style={styles.pickerView}>
        <Picker
          style={{ height: 50, width: 150 }}
          onValueChange={(value) => setStatus(value)}
          selectedValue={status}
        >
          <Picker.Item label="Selecteaza" value="" />
          <Picker.Item
            label="Sesizari in curs de verificare"
            value="VERIFYING"
          />
          <Picker.Item label="Sesizari in lucru" value="IN_PROGRESS" />
          <Picker.Item label="Sesizari rezolvate" value="DONE" />
        </Picker>
      </View>
      {loadingObject.loading && (
        <LoadingScreen
          loading={loadingObject.loading}
          text={loadingObject.text}
        />
      )}
      {problems.length > 0 ? (
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
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>
            Nu exista nici o sesizare cu statusul {convertStatus(status)}
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  pickerView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
export default MyProblems;
