import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import { checkAuthStatus } from './redux/actions/authActions';
import AuthStack from './navigation/AuthStack';
import MainStack from './navigation/MainStack';
import SplashScreen from 'react-native-splash-screen'; // Importation du splash natif
import './translations/i18n';

const App = () => {
  const dispatch = useDispatch();
  const navigationRef = useRef();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(checkAuthStatus());
    // Masquer le splash natif dès que l'app est initialisée
    SplashScreen.hide();
    // Par exemple, simuler un court délai de chargement
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [dispatch]);

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoading ? (
        // Vous pouvez afficher ici un indicateur de chargement simple ou une vue blanche
        null
      ) : isAuthenticated ? (
        <MainStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default function RootApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
