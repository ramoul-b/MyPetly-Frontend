// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import MyNavigator from './navigation';
import { checkAuthStatus } from './redux/actions/authActions';
import Icon from 'react-native-vector-icons/FontAwesome';


const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà authentifié
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <MyNavigator />
      <Icon name="home" size={30} color="black" />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
