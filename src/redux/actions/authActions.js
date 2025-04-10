import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { saveAuthData, getAuthData, clearAuthData } from '../../utils/authStorage';
//import { loginStart, loginSuccess, loginFailure, logout } from '../reducers/authReducer';
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

// ✅ Inscription d'un utilisateur (Register)
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
      await saveAuthData(data.access_token, data.user);
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

// ✅ Connexion d'un utilisateur (Login)
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  logDebug(i18n.t("auth.login_start"), { email });

  try {
    logDebug(i18n.t("auth.sending_request"), `${API_BASE_URL}/login`);
    logDebug(i18n.t("auth.request_body"), { email, password });

    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });

    logDebug(i18n.t("auth.api_response"), response.data);

    if (response.data.access_token && response.data.user) {
      const { access_token, user } = response.data;
      await saveAuthData(access_token, user);
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

// ✅ Vérification de la session utilisateur (Check Auth)
export const checkAuthStatus = () => async (dispatch) => {
  try {
  const { token, user } = await getAuthData();
  console.log("📦 Données récupérées :", { token, user });


    if (token && user) {
      console.log("✅ Token trouvé, dispatch loginSuccess");
      dispatch(loginSuccess({ token, user }));
      logDebug(i18n.t("auth.session_restored"), user);
    } else {
      console.log("🚫 Pas de token trouvé, dispatch logout");
      dispatch(logout());
      logDebug(i18n.t("auth.no_user_connected"));
    }
  } catch (error) {
    console.error(i18n.t("auth.session_error"), error);
    dispatch(logout());
  }
};

// ✅ Déconnexion de l'utilisateur (Logout)
export const logoutUser = () => async (dispatch) => {
  try {
    await clearAuthData();
    dispatch(logout());
    logDebug(i18n.t("auth.logout_success"));
  } catch (error) {
    console.error(i18n.t("auth.logout_error"), error);
  }
};
