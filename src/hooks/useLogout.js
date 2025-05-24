// src/hooks/useLogout.js
import { useDispatch } from 'react-redux';
import { authService } from '../services/authService';

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    await authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  return logout;
};
