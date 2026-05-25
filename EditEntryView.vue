import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/entries"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default {
  getEntries(params = {}) {
    return api.get("/", { params });
  },

  getEntry(id) {
    return api.get(`/${id}`);
  },

  createEntry(payload) {
    return api.post("/", payload);
  },

  updateEntry(id, payload) {
    return api.put(`/${id}`, payload);
  },

  deleteEntry(id) {
    return api.delete(`/${id}`);
  },

  incrementUsage(id) {
    return api.patch(`/${id}/use`);
  },

  getStats() {
    return api.get("/stats/summary");
  },

  getQuizQuestion() {
    return api.get("/quiz/question");
  }
};