import axios from "axios";

let axiosInstance = axios.create({
  baseURL: "http://192.168.0.101:8081",
  //baseURL: "https://proiect-lugoj-be.herokuapp.com",
});

export default axiosInstance;
