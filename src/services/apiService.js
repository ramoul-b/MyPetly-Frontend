import axios from "axios";
import CONFIG from "../config";

const apiService = axios.create({
  baseURL: CONFIG.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour gérer les erreurs globalement
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Méthodes API générales
const api = {
  get: (url, params) => apiService.get(url, { params }),
  post: (url, data) => apiService.post(url, data),
  put: (url, data) => apiService.put(url, data),
  delete: (url) => apiService.delete(url),
};

export default api;
