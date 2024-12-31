import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Add Basic Auth header to requests
API.interceptors.request.use((config) => {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  if (username && password) {
    config.headers.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
  }
  return config;
});

export default API;
