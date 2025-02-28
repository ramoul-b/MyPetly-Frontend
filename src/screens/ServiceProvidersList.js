import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';

const serviceProviders = [
  {
    id: 1,
    name: 'Vasilenko Oksana',
    specialty: 'Veterinary Dentist',
    rating: 4.8,
    reviews: 125,
    experience: '10 years of experience',
    distance: '1.5 km',
    price: '$20',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Avramenko Vladimir',
    specialty: 'Veterinary Dentist',
    rating: 4.7,
    reviews: 108,
    experience: '7 years of experience',
    distance: '1.5 km',
    price: '$20',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Aleksenko Vasily',
    specialty: 'Veterinary Dentist',
    rating: 4.6,
    reviews: 102,
    experience: '15 years of experience',
    distance: '1.5 km',
    price: '$20',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Lauren Sell',
    specialty: 'Veterinary Dentist',
    rating: 4.5,
    reviews: 95,
    experience: '10 years of experience',
    distance: '1.5 km',
    price: '$20',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    name: 'Shinkarenko Eugene',
    specialty: 'Veterinary Dentist',
    rating: 4.4,
    reviews: 81,
    experience: '10 years of experience',
    distance: '1.5 km',
    price: '$20',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    name: 'Vasilenko Oksana',
    specialty: 'Veterinary Dentist',
    rating: 4.8,
    reviews: 125,
    experience: '10 years of experience',
    distance: '1.5 km',
    price: '$20',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 7,
    name: 'Avramenko Vladimir',
    specialty: 'Veterinary Dentist',
    rating: 4.7,
    reviews: 108,
    experience: '7 years of experience',
    distance: '1.5 km',
    price: '$20',
    image: 'https://via.placeholder.com/150',
  },
];

const ServiceProvidersScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const { serviceName } = route.params || {}; 

  return (
    <View style={styles.container}>
      {/* Utilisation du Header global */}
      <AppHeader title={t(serviceName)} navigation={navigation} />

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#888" />
        <TextInput 
          style={styles.searchInput} 
          placeholder={t('search_placeholder', { service: serviceName })} 
        />
      </View>

      {/* Liste des prestataires */}
      <FlatList
        data={serviceProviders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProviderDetails', { providerId: item.id })}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.specialty}>{item.specialty}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐ {item.rating}</Text>
                <Text style={styles.reviews}>{item.reviews} Reviews</Text>
              </View>
              <Text style={styles.experience}>{item.experience}</Text>
              <View style={styles.metaInfo}>
                <View style={styles.row}>
                  <Icon name="location-outline" size={16} color="#4A4A4A" />
                  <Text style={styles.metaText}>{item.distance}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="cash-outline" size={16} color="#4A4A4A" />
                  <Text style={styles.metaText}>{item.price}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#FFA500',
    marginRight: 5,
  },
  reviews: {
    fontSize: 12,
    color: '#666',
  },
  experience: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  metaInfo: {
    flexDirection: 'row',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  metaText: {
    fontSize: 12,
    marginLeft: 5,
    color: '#4A4A4A',
  },
});

export default ServiceProvidersScreen;
