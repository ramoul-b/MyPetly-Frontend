import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import Profile from '../screens/Profile';
import AddPetScreen from '../screens/AddPet';
import Splash from '../screens/Splash';
import ProviderProfileScreen from '../screens/ProviderProfileScreen';
import PetDetailsScreen from '../screens/PetDetailsScreen';
import EditPetScreen from '../screens/EditPetScreen';
import BookingScreen from '../screens/BookingScreen';
import BookingSuccess from '../screens/BookingSuccess'; 
import MyAppointmentsScreen from '../screens/MyAppointmentsScreen';

const Stack = createStackNavigator();
console.log("📌 MainStack chargé");

export default function MainStack() {
  return (
    <Stack.Navigator>
    <Stack.Screen
      name="HomeTabs"
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    <Stack.Screen name="AddPet" component={AddPetScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PetDetails" component={PetDetailsScreen}  options={{ headerShown: false }} />
    <Stack.Screen name="EditPet" component={EditPetScreen} options={{ title: 'Modifier l’animal' }} />

    <Stack.Screen
      name="ProviderProfile"
      component={ProviderProfileScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="BookingScreen" component={BookingScreen} options={{ presentation: 'modal', headerShown: false }} />

<Stack.Screen
  name="BookingSuccess"
  component={BookingSuccess}
  options={{ headerShown: false }}
/>



<Stack.Screen
  name="MyAppointments"
  component={MyAppointmentsScreen}
  options={{ title: 'Mes RDV' }}
/>


  </Stack.Navigator>
  );
}

