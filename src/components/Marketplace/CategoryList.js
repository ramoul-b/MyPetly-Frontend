import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import MarketplaceStyles from '../../assets/styles/MarketplaceStyles';

const categories = [
  { id: '1', name: 'Nourriture 🍖' },
  { id: '2', name: 'Accessoires 🎾' },
  { id: '3', name: 'Santé 💊' },
  { id: '4', name: 'Toilettage 🛁' },
  { id: '5', name: 'Dressage 🎓' },
  { id: '6', name: 'Adoption 🏡' },
];

const CategoryList = () => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={{ marginRight: 10, padding: 10, backgroundColor: '#FFF', borderRadius: 10 }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default CategoryList;
