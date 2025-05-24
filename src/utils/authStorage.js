import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Fonction pour sauvegarder les données d'authentification
export const saveAuthData = async (token, user) => {
  try {
    await AsyncStorage.setItem('access_token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    console.log("🔐 Token sauvegardé :", token);
console.log("👤 Utilisateur sauvegardé :", user);

  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement des données :", error);
  }
};

// ✅ Fonction pour récupérer les données d'authentification
export const getAuthData = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    const userString = await AsyncStorage.getItem('user');
    return { token, user: userString ? JSON.parse(userString) : null };
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des données :", error);
    return { token: null, user: null };
  }
};

// ✅ Fonction pour supprimer les données d'authentification
export const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error("❌ Erreur lors de la suppression des données :", error);
  }
};

// ✅ Ajout d’un log pour vérifier que le module est bien chargé
console.log("✅ authStorage.js chargé avec succès !");
