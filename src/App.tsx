// src/App.js
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import AuthStack from './navigation/AuthStack';
import MainStack from './navigation/MainStack';
import SplashScreen from 'react-native-splash-screen';
import './translations/i18n';
import { QueryClient, QueryClientProvider } from 'react-query';
import { checkAuthStatus } from './redux/actions/authActions';

const queryClient = new QueryClient();

const AppContent = () => {
  const navigationRef = useRef();
  const dispatch = useDispatch(); // ✅ tu l'avais oublié !
  const { isAuthenticated } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(checkAuthStatus()); // 🔥 obligatoire pour recharger la session
    SplashScreen.hide();

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoading ? null : isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </Provider>
  );
}
