import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2405/api",
  withCredentials: true,
});

export default axiosInstance;
