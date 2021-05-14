import axios from "axios";

let axiosInstance = axios.create({
  baseURL: "https://proiect-lugoj-be.herokuapp.com",
});

export default axiosInstance;
