// src/hooks/useLogin.js
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { authService } from '../services/authService';

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation(
    async ({ email, password }) => {
      console.log('🟡 Tentative de login avec :', email);
      const response = await authService.login(email, password);
      console.log('🟢 Réponse reçue du backend :', response);
      return response;
    },
    {
      onSuccess: (data) => {
        console.log('✅ Succès login, données reçues :', data);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: data.user,
            token: data.token,
          },
        });
      },
      onError: (err) => {
        console.log('❌ Erreur login :', err.response?.data || err.message);
      },
    }
  );
};
