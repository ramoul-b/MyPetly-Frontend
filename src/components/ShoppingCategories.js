import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import ShoppingCategoriesStyles from "../assets/styles/ShoppingCategoriesStyles";

const categories = [
  { id: '1', name: 'Food', icon: 'restaurant', type: 'material', color: '#FFBE5E' }, // Nourriture
  { id: '2', name: 'Medicine', icon: 'local-pharmacy', type: 'material', color: '#6D9EEB' }, // Médicaments
  { id: '3', name: 'Toys', icon: 'pets', type: 'material', color: '#E57C94' }, // Jouets
  { id: '4', name: 'Accessories', icon: 'shopping-bag', type: 'material', color: '#9C27B0' }, // Accessoires
  { id: '5', name: 'Beds', icon: 'hotel', type: 'material', color: '#4CAF50' }, // Lits et coussins
  { id: '6', name: 'Hygiene', icon: 'cleaning-services', type: 'material', color: '#FFA500' }, // Hygiène et soins
  { id: '7', name: 'Collars', icon: 'security', type: 'material', color: '#3F51B5' }, // Colliers NFC/GPS
  { id: '8', name: 'Clothes', icon: 'checkroom', type: 'material', color: '#F44336' }, // Vêtements pour animaux
  { id: '9', name: 'Transport', icon: 'directions-car', type: 'material', color: '#607D8B' }, // Transport et cages
  { id: '10', name: 'Bowls', icon: 'water', type: 'material', color: '#795548' }, // Gamelles et distributeurs
  { id: '11', name: 'Training', icon: 'self-improvement', type: 'material', color: '#2196F3' }, // Produits de dressage
  { id: '12', name: 'Grooming', icon: 'spa', type: 'material', color: '#E91E63' }, // Toilettage et soins
];


const ShoppingCategories = ({ navigation }) => {
  return (
    <View style={ShoppingCategoriesStyles.container}>
      <View style={ShoppingCategoriesStyles.header}>
        <Text style={ShoppingCategoriesStyles.title}>Shopping Categories</Text>
        <TouchableOpacity onPress={() => console.log('See All pressed')}>
          <Text style={ShoppingCategoriesStyles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[ShoppingCategoriesStyles.category, { backgroundColor: item.color }]}
            onPress={() => console.log(`Navigating to ${item.name}`)}
          >
            <Icon name={item.icon} type={item.type} size={30} color="white" />
            <Text style={ShoppingCategoriesStyles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={ShoppingCategoriesStyles.list}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};


export default ShoppingCategories;
