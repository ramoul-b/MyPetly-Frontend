import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import PetsScreen from '../screens/Pets';
import TrackPetsScreen from '../screens/TrackPetsScreen';
import MarketplaceScreen from '../screens/Marketplace';
import CommunityScreen from '../screens/Community';
import ProfileScreen from '../screens/Profile'; // Import de la page Profil
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ⚡ Stack interne pour gérer Home et Profile sans enlever le BottomTab
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ headerShown: false }} // Profile s'ouvre sans cacher la barre du bas
      />
    </Stack.Navigator>
  );
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: { backgroundColor: '#ffffff', height: 60 },
        tabBarActiveTintColor: '#5E72E4',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack}  // Utilise la stack pour Home et Profile
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon name="home-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Mes Animaux" 
        component={PetsScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon name="paw-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Trouver" 
        component={TrackPetsScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon name="location-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Marketplace" 
        component={MarketplaceScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon name="cart-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Communauté" 
        component={CommunityScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon name="people-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
