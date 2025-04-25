// src/hooks/useLogin.js
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/authActions'; // ✅ import de l'action complète

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation(
    async ({ email, password }) => {
      console.log('🟡 Tentative de login avec :', email);
      await dispatch(loginUser(email, password)); // ✅ appelle la bonne logique avec saveToken()
    }
  );
};
