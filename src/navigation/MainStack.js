// src/navigation/MainStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Home from '../screens/Home'; // Décommentez cet import
// import Profile from '../screens/Profile'; // Si besoin

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }}  
      />
      <Stack.Screen 
        name="Register" 
        component={Register} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false }} 
      />
      {/*
        <Stack.Screen name="Profile" component={Profile} />
      */}
    </Stack.Navigator>
  );
}
