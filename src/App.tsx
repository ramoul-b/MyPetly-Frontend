// App.js
import React, { useEffect, useRef } from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import { checkAuthStatus } from './redux/actions/authActions';
import AuthStack from './navigation/AuthStack';
import MainStack from './navigation/MainStack';
import './translations/i18n';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <RootStack.Screen name="MainStack" component={MainStack} />
      ) : (
        <RootStack.Screen name="AuthStack" component={AuthStack} />
      )}
    </RootStack.Navigator>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const navigationRef = useRef();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStackScreen />
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
