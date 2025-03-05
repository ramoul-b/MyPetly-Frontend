import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppHeader from '../components/AppHeader';
import BannerSlider from '../components/AdBanner';

// 🔹 Données statiques pour les catégories (Alignées avec la Home)
const categories = [
  { id: '1', name: 'Food', icon: 'fast-food-outline', color: '#FFA500' },
  { id: '2', name: 'Medicine', icon: 'medkit-outline', color: '#4CAF50' },
  { id: '3', name: 'Toys', icon: 'paw-outline', color: '#E57C94' },
  { id: '4', name: 'Accessories', icon: 'bag-outline', color: '#795548' },
  { id: '5', name: 'Food', icon: 'fast-food-outline', color: '#FFA500' },
  { id: '6', name: 'Medicine', icon: 'medkit-outline', color: '#4CAF50' },
  { id: '7', name: 'Toys', icon: 'paw-outline', color: '#E57C94' },
  { id: '8', name: 'Accessories', icon: 'bag-outline', color: '#795548' },
];

// 🔹 Données statiques pour les produits
const products = [
  {
    id: '1',
    name: 'Croquettes Premium',
    price: '25€',
    rating: 4.7,
    reviews: 120,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Laisse en cuir',
    price: '15€',
    rating: 4.5,
    reviews: 85,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Shampooing bio',
    price: '12€',
    rating: 4.8,
    reviews: 98,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    name: 'Panier douillet',
    price: '35€',
    rating: 4.6,
    reviews: 67,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '5',
    name: 'Croquettes Premium',
    price: '25€',
    rating: 4.7,
    reviews: 120,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '6',
    name: 'Laisse en cuir',
    price: '15€',
    rating: 4.5,
    reviews: 85,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '7',
    name: 'Shampooing bio',
    price: '12€',
    rating: 4.8,
    reviews: 98,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '8',
    name: 'Panier douillet',
    price: '35€',
    rating: 4.6,
    reviews: 67,
    image: 'https://via.placeholder.com/150',
  }

];

const MarketplaceScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      {/* ✅ Header Global */}
      <AppHeader title="Marketplace" navigation={navigation} />
               
      {/* ✅ Barre de Recherche */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un produit..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
       {/* Bannière promotionnelle */}
        <BannerSlider />
        {/* ✅ Catégories (Alignées avec la Home) */}
        <View>
          <Text style={styles.sectionTitle}>Shopping Categories</Text>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.category, { backgroundColor: item.color + '20' }]}>
                <Icon name={item.icon} size={24} color={item.color} />
                <Text style={[styles.categoryText, { color: item.color }]}>{item.name}</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </View>
               
        {/* ✅ Liste des Produits */}
        <View>
          <Text style={styles.sectionTitle}>Produits Populaires</Text>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.productCard}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <View style={styles.productRating}>
                  <Icon name="star" size={14} color="#FFA500" />
                  <Text style={styles.ratingText}>{item.rating} ({item.reviews} avis)</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.productList}
          />
        </View>
      </ScrollView>

      {/* ✅ Bouton Flottant "Vendre un Produit" */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => console.log('Vendre un produit')}>
        <Icon name="cart" size={50} color="#5E72E4" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10,
  },
  category: {
    padding: 12,
    margin: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    elevation: 2,
  },
  categoryText: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  productList: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    margin: 8,
    flex: 1,
    alignItems: 'center',
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 5,
    color: '#888',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default MarketplaceScreen;
