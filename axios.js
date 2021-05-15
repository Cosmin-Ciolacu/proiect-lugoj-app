import axios from "axios";

let axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
  // baseURL: "https://proiect-lugoj-be.herokuapp.com",
});

export default axiosInstance;
