import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import axiosInstance from "../../axios";
import { categoriesNames } from "../../core/categories";
import { BarChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundColor: "#000000",
  backgroundGradientFrom: "#1E2923",
  backgroundGradientTo: "#08130D",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },

  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const Stats = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axiosInstance.post(
        "/chart/problems-numbers",
        {
          categories: categoriesNames,
        },
        {
          headers: {
            "auth-token": await AsyncStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        const data = res.data.data;
        const categories = data.map((d) => d.category);
        console.log(categories);
        setLabels(categories);
        const values = data.map((d) => d.nr);
        console.log(values);
        setValues(values);
      }
    })();
  }, []);
  return (
    <View>
      <Text>Bezier Line Chart</Text>
      {labels.length > 0 && values.length > 0 && (
        <BarChart
          //style={graphStyle}
          data={{
            labels: [...labels],
            datasets: [
              {
                data: values,
              },
            ],
          }}
          width={screenWidth}
          height={300}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      )}
    </View>
  );
};

export default Stats;
