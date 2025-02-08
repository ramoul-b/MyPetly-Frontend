import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import PetsScreen from '../screens/Pets';
import TrackPetsScreen from '../screens/TrackPets';
import MarketplaceScreen from '../screens/Marketplace';
import CommunityScreen from '../screens/Community';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

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
        name="Home" 
        component={HomeScreen} 
        options={{
          headerShown: false ,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Mes Animaux" 
        component={PetsScreen} 
        options={{
          headerShown: false ,
          tabBarIcon: ({ color, size }) => (
            <Icon name="paw-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Trouver" 
        component={TrackPetsScreen} 
        options={{
          headerShown: false ,
          tabBarIcon: ({ color, size }) => (
            <Icon name="location-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Marketplace" 
        component={MarketplaceScreen} 
        options={{
          headerShown: false ,
          tabBarIcon: ({ color, size }) => (
            <Icon name="cart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Communauté" 
        component={CommunityScreen} 
        options={{
          headerShown: false ,
          tabBarIcon: ({ color, size }) => (
            <Icon name="people-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
