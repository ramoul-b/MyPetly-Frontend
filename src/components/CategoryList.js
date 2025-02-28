import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import CategoryListStyles from "../styles/CategoryListStyles";
import Theme from "../constants/Theme";

const categories = [
  { id: '1', name: 'Vet', icon: 'medical-services', type: 'material', color: '#6D9EEB' }, // Vétérinaire
  { id: '2', name: 'Training', icon: 'self-improvement', type: 'material', color: '#FFBE5E' }, // Dressage
  { id: '3', name: 'Grooming', icon: 'spa', type: 'material', color: '#E57C94' }, // Toilettage
  { id: '4', name: 'Food', icon: 'restaurant', type: 'material', color: '#FFA500' }, // Nourriture
  { id: '5', name: 'Medicine', icon: 'medication', type: 'material', color: '#4CAF50' }, // Médicaments
  { id: '6', name: 'Accessories', icon: 'shopping-bag', type: 'material', color: '#795548' }, // Accessoires
  { id: '7', name: 'Pet-sitter', icon: 'home', type: 'material', color: '#2196F3' }, // Garde d'animaux
  { id: '8', name: 'Walking', icon: 'directions-walk', type: 'material', color: '#9C27B0' }, // Promenade
  { id: '9', name: 'Adoption', icon: 'favorite', type: 'material', color: '#F44336' }, // Adoption
  { id: '10', name: 'Lost & Found', icon: 'search', type: 'material', color: '#607D8B' }, // Animaux perdus
  { id: '11', name: 'Insurance', icon: 'verified', type: 'material', color: '#673AB7' }, // Assurance pour animaux
  { id: '12', name: 'Events', icon: 'event', type: 'material', color: '#3F51B5' }, // Événements
];

const CategoryList = () => {
  const navigation = useNavigation();

  return (
    <View style={CategoryListStyles.container}>
      <View style={CategoryListStyles.header}>
        <Text style={CategoryListStyles.title}>What are you looking for?</Text>
        <TouchableOpacity onPress={() => console.log('See All pressed')}>
          <Text style={CategoryListStyles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[CategoryListStyles.category, { backgroundColor: '#F5F5F5', borderColor: item.color }]}
            onPress={() => navigation.navigate('ServiceProviders', { serviceName: item.name })}
          >
            <Icon name={item.icon} type={item.type} size={22} color={item.color} style={CategoryListStyles.icon} />
            <Text style={[CategoryListStyles.text, { color: Theme.COLORS.TEXT_PRIMARY }]}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={CategoryListStyles.list}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryList;
