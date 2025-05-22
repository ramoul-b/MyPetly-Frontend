import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import AppHeader from '../components/AppHeader';
import useProviders from '../hooks/useProviders';
import Geolocation from '@react-native-community/geolocation';
import { geocodeAddress } from '../utils/geocode';
import { calculateDistance } from '../utils/distance';

const ServiceProvidersScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t, i18n } = useTranslation();
  const { serviceId, serviceName } = route.params || {};
  const lang = i18n.language || 'en';

  const { providers: serviceProviders, loading } = useProviders(serviceId);

  const [userLocation, setUserLocation] = useState(null);
  const [distances, setDistances] = useState({});

  // Position utilisateur
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('❌ Erreur localisation user :', error);
        // Fallback à Paris par défaut
        setUserLocation({ latitude: 48.8566, longitude: 2.3522 });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);
  

  // Calcul des distances
  useEffect(() => {
    if (!userLocation) return;

    const fetchDistances = async () => {
      const result = {};
      for (const item of serviceProviders) {
        const coords = await geocodeAddress(item.provider?.address);
        if (coords) {
          result[item.id] = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            coords.latitude,
            coords.longitude
          );
        }
      }
      setDistances(result);
    };

    fetchDistances();
  }, [userLocation, serviceProviders]);

  if (loading) return <Text>Chargement...</Text>;

  return (
    <View style={styles.container}>
      <AppHeader title={t(serviceName)} navigation={navigation} />

      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder={t('search_placeholder', { service: serviceName })}
        />
      </View>

      <FlatList
        data={serviceProviders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const provider = item.provider;
          const distance = distances[item.id]
            ? `${distances[item.id]} km`
            : '...';

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
              navigation.navigate('ProviderProfile', {
                providerId: item.provider?.id,
                serviceId: serviceId,
              })
}

            >
              <Image
                source={{ uri: provider.photo || 'https://via.placeholder.com/60' }}
                style={styles.image}
              />
              <View style={styles.info}>
                <Text style={styles.name}>{provider.name?.[lang] || 'N/A'}</Text>
                <Text style={styles.specialty}>
                  {provider.specialization?.[lang] || '-'}
                </Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>⭐ {provider.rating}</Text>
                </View>
                <View style={styles.metaInfo}>
                  <View style={styles.row}>
                    <Icon name="location-outline" size={16} color="#4A4A4A" />
                    <Text style={styles.metaText}>{distance}</Text>
                  </View>
                  <View style={styles.row}>
                    <Icon name="cash-outline" size={16} color="#4A4A4A" />
                    <Text style={styles.metaText}>{item.price} €</Text>
                  </View>
                  <View style={styles.row}>
                    <Icon name="time-outline" size={16} color="#4A4A4A" />
                    <Text style={styles.metaText}>{item.duration} min</Text>
                  

                  </View>
                  
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Aucun prestataire trouvé
          </Text>
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
  metaInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    marginLeft: 5,
    color: '#4A4A4A',
  },
});

export default ServiceProvidersScreen;
