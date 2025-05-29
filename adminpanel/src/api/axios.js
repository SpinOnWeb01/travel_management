import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true, // important for sending HttpOnly cookies
});

export default axiosInstance;