// redux/actions/authActions.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginStart, loginSuccess, loginFailure, logout } from '../reducers/authReducer';

// Action pour enregistrer (inscrire) un nouvel utilisateur
export const registerUser = (name, email, password, passwordConfirmation) => async (dispatch) => {
  console.log("🟢 Action registerUser déclenchée !");
  dispatch(loginStart());

  try {
    // Appel à l'API pour l'inscription
    const response = await axios.post('http://localhost:8000/api/v1/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,  // Utilise le paramètre passé
    });
    console.log("✅ Réponse API reçue :", response.data);

    // Supposons que l'API retourne un token et un objet utilisateur
    if (response.data.access_token && response.data.user) {
      const { access_token, user } = response.data;
      console.log("🔐 Utilisateur enregistré :", user);

      // Sauvegarder le token et l'utilisateur dans AsyncStorage
      await AsyncStorage.setItem('access_token', access_token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // Déclencher l'action de succès (auto-login après inscription)
      dispatch(loginSuccess({ token: access_token, user }));
    } else {
      console.log("❌ Réponse API invalide :", response.data);
      dispatch(loginFailure("Réponse API invalide"));
    }
  } catch (error) {
    console.log("❌ Erreur API lors de l'inscription :", error.response?.data?.message || error.message);
    dispatch(loginFailure(error.response?.data?.message || "Erreur inconnue"));
  }
};

// Action pour connecter un utilisateur déjà existant
export const loginUser = (email, password) => async (dispatch) => {
  console.log("🟢 Action loginUser déclenchée !");
  dispatch(loginStart());

  try {
    const response = await axios.post('http://localhost:8000/api/v1/login', { email, password });
    console.log("✅ Réponse API reçue :", response.data);

    if (response.data.access_token && response.data.user) {
      const { access_token, user } = response.data;
      console.log("🔐 Utilisateur connecté :", user);

      await AsyncStorage.setItem('access_token', access_token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      dispatch(loginSuccess({ token: access_token, user }));
    } else {
      console.log("❌ Réponse API invalide :", response.data);
      dispatch(loginFailure("Réponse API invalide"));
    }
  } catch (error) {
    console.log("❌ Erreur API :", error.response?.data?.message || error.message);
    dispatch(loginFailure(error.response?.data?.message || "Erreur inconnue"));
  }
};

export const checkAuthStatus = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    const userString = await AsyncStorage.getItem('user');

    if (token && userString) {
      const user = JSON.parse(userString);
      console.log("✅ Session restaurée :", user);
      dispatch(loginSuccess({ token, user }));
    } else {
      console.log("🔴 Aucun utilisateur connecté.");
      dispatch(logout());
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de la session :", error);
    dispatch(logout());
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('user');
    dispatch(logout());
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};
