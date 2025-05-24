// src/services/authService.js
import apiClient from './apiClient';
import { saveToken, clearToken } from './tokenStorage';

export const authService = {
    login: async (email, password) => {
      console.log("📩 Envoi login avec :", email);
      try {
        const response = await apiClient.post('/login', { email, password });
        console.log("✅ Réponse API login :", response.data);
        return response.data;
      } catch (error) {
        console.log("❌ Erreur API login :", error.response?.data || error.message);
        throw error;
      }
    },

  register: async (userData) => {
    const { data } = await apiClient.post('/register', userData);
    return data;
  },

  logout: async () => {
    await apiClient.post('/logout');
    await clearToken();
  },

  refreshToken: async () => {
    const { data } = await apiClient.post('/refresh-token');
    await saveToken(data.token);
    return data;
  }
};
