import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

axios.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.token = token;
    return req;
  }
  return req;
});
