import axios from 'axios';
import { API_BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveToken, getToken, clearToken } from '../../services/tokenStorage';
import i18n from '../../translations/i18n';
import { authService } from '../../services/authService';

const loginStart = () => ({ type: 'LOGIN_START' });
const loginSuccess = (data) => ({ type: 'LOGIN_SUCCESS', payload: data });
const loginFailure = (error) => ({ type: 'LOGIN_FAILURE', payload: error });
const logout = () => ({ type: 'LOGOUT' });

// ✅ Fonction pour afficher les logs seulement en mode développement
const logDebug = (message, data = null) => {
  if (__DEV__) {
    console.log(message, data);
  }
};

// ✅ Enregistrement de l’utilisateur
export const registerUser = (name, email, password, passwordConfirmation) => async (dispatch) => {
  dispatch(loginStart());
  logDebug(i18n.t("auth.register_start"), { name, email });

  try {
    const data = await authService.register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });

    logDebug(i18n.t("auth.api_response"), data);

    if (data.access_token && data.user) {
      await saveToken(data.access_token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      dispatch(loginSuccess({ token: data.access_token, user: data.user }));
      logDebug(i18n.t("auth.register_success"));
    } else {
      dispatch(loginFailure(i18n.t("auth.invalid_response")));
      logDebug(i18n.t("auth.invalid_response"), data);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || i18n.t("auth.unknown_error");
    dispatch(loginFailure(errorMessage));
    logDebug(i18n.t("auth.register_error"), errorMessage);
  }
};

// ✅ Connexion utilisateur
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  logDebug(i18n.t("auth.login_start"), { email });

  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    logDebug(i18n.t("auth.api_response"), response.data);

    if (response.data.access_token && response.data.user) {
      const { access_token, user } = response.data;
      await saveToken(access_token); // 🔥 Ce log ne s'affiche pas actuellement => problème ici
      console.log("💾 Sauvegarde du token :", access_token); // Ajoute ce log ici
    
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch(loginSuccess({ token: access_token, user }));

      logDebug(i18n.t("auth.login_success"));
    } else {
      dispatch(loginFailure(i18n.t("auth.invalid_response")));
      logDebug(i18n.t("auth.invalid_response"), response.data);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || i18n.t("auth.unknown_error");
    dispatch(loginFailure(errorMessage));
    logDebug(i18n.t("auth.login_error"), errorMessage);
  }
};

export const checkAuthStatus = () => async (dispatch) => {
  try {
    const token = await getToken();
    const userString = await AsyncStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    console.log("📦 Données récupérées depuis AsyncStorage :", { token, user });

    if (token && user) {
      dispatch(loginSuccess({ token, user }));
    } else {
      console.log("🚫 Pas de token ou user, on logout");
      dispatch(logout());
    }
  } catch (error) {
    console.error("❌ Erreur checkAuthStatus :", error);
    dispatch(logout());
  }
};


// ✅ Déconnexion
export const logoutUser = () => async (dispatch) => {
  try {
    await clearToken();
    await AsyncStorage.removeItem('user');
    dispatch(logout());
    logDebug(i18n.t("auth.logout_success"));
  } catch (error) {
    console.error(i18n.t("auth.logout_error"), error);
  }
};
