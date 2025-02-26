import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import Profile from '../screens/Profile';
import AddPetScreen from '../screens/AddPet';
import Splash from '../screens/Splash'; // Assure-toi que le chemin est correct


const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="AddPet" component={AddPetScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

