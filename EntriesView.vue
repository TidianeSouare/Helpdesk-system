import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:5000/api/auth"
});

export default {
  register(payload) {
    return authApi.post("/register", payload);
  },

  login(payload) {
    return authApi.post("/login", payload);
  },

  getMe(token) {
    return authApi.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};