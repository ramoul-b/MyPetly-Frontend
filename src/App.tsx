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
import { StripeProvider } from '@stripe/stripe-react-native';

const queryClient = new QueryClient();

const AppContent = () => {
  const navigationRef = useRef();
  const dispatch = useDispatch(); // ✅ tu l'avais oublié !
  const { isAuthenticated } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      console.log("🟡 Initialisation de l'application...");
      await dispatch(checkAuthStatus()); // ✅ on attend le chargement des données
      SplashScreen.hide();
      setIsLoading(false);
    };
  
    initApp();
  }, [dispatch]);
  
  

  return (
    <StripeProvider publishableKey="pk_test_51ROabJPbuTuXlZ2tbB75470UdBoZyEUHKY0JuCDvckdsXJ1ZVVtwgOrAFyVs1GLIvzMk3L3g8sUbVd8USrp5j1Nm00Tw49oSef">
      <NavigationContainer ref={navigationRef}>
        {isLoading ? null : isAuthenticated ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </StripeProvider>
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
