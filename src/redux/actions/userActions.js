import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateUserStart = () => ({
  type: 'UPDATE_USER_START',
});

export const updateUserSuccess = (user) => ({
  type: 'UPDATE_USER_SUCCESS',
  payload: user,
});

export const updateUserFailure = (error) => ({
  type: 'UPDATE_USER_FAILURE',
  payload: error,
});

// Utilisez POST si votre API l'exige
export const updateUser = (updatedData) => async (dispatch, getState) => {
  dispatch(updateUserStart());
  try {
    const token = getState().auth.token; // Récupération du token depuis l'état d'authentification

    // Remplacer PUT par POST
    const response = await axios.post('http://vps-88a3af89.vps.ovh.net:8081/api/v1/account/profile', updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Réponse API dans updateUser:", response.data); // Log pour vérifier la réponse

    if (response.data.user) {
      const updatedUser = response.data.user;
      // Mettre à jour AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      // Dispatch l'action pour mettre à jour le Redux store
      dispatch(updateUserSuccess(updatedUser));
    } else {
      dispatch(updateUserFailure("Réponse API invalide"));
    }
  } catch (error) {
    console.error("Erreur lors de updateUser:", error.response?.data || error.message);
    dispatch(updateUserFailure(error.response?.data?.message || "Erreur inconnue"));
  }
};
