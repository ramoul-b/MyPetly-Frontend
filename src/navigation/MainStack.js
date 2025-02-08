import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
    name="Profile"
    component={Profile} // Votre composant ProfileScreen
    options={{ headerShown: false }} // ou false selon votre besoin
  />

    </Stack.Navigator>
  );
}
