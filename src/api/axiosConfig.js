import axios from "axios";

// Create axios instance with backend URL
const API = axios.create({
  baseURL: "https://charity-backend-b1tc.onrender.com/api",
});

// Automatically attach token from localStorage if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;

// Optional helper to manually set or remove token
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

