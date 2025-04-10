// src/services/tokenStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token) => {
  await AsyncStorage.setItem('authToken', token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

export const clearToken = async () => {
  await AsyncStorage.removeItem('authToken');
};

export const refreshToken = async () => {
    console.log("🟠 Aucun refreshToken défini sur l'API. Ignore cette étape.");
    return null; // ou lance une erreur personnalisée si besoin
  };