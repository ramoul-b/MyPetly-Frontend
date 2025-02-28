import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const ProviderCard = ({ provider, onPress }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: provider.photo }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{provider.name}</Text>
        <Text style={styles.specialty}>{provider.specialty}</Text>
        <Text style={styles.rating}>{t('rating')}: {provider.rating} ⭐</Text>
        <Text style={styles.price}>{t('price')}: {provider.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  info: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 16,
    color: '#666',
  },
  rating: {
    fontSize: 14,
    color: '#888',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
});

export default ProviderCard;
