// src/services/tokenStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token) => {
  console.log("💾 Sauvegarde du token :", token);
  await AsyncStorage.setItem('authToken', token);
};


export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    console.log("🧪 getToken() → token récupéré :", token);
    return token;
  } catch (error) {
    console.error("❌ Erreur getToken :", error);
    return null;
  }
};


export const clearToken = async () => {
  await AsyncStorage.removeItem('authToken');
};

export const refreshToken = async () => {
    console.log("🟠 Aucun refreshToken défini sur l'API. Ignore cette étape.");
    return null; // ou lance une erreur personnalisée si besoin
  };