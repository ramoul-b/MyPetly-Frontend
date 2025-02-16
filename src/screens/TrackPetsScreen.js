import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import AppIcon from '../components/AppIcon';

export default function TrackPetsScreen() {
  const navigation = useNavigation();
  const [hasGPS, setHasGPS] = useState(false); // Simule la détection GPS

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <AppHeader title={'📡 Suivi GPS des Animaux'} navigation={navigation} />

      {/* MAP EN ARRIÈRE-PLAN */}
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: 45.4642, // Exemple : Milan
          longitude: 9.1900,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {hasGPS && (
          <Marker
            coordinate={{ latitude: 45.4642, longitude: 9.1900 }}
            title="Position de l'animal"
            description="Dernière localisation connue"
          />
        )}
      </MapView>

      {/* MESSAGE SI PAS DE GPS */}
      {!hasGPS && (
        <View style={styles.noGpsContainer}>
          <AppIcon name="alert-circle-outline" size={28} color="#FB6340" />
          <Text style={styles.noGpsText}>Aucun animal avec un collier GPS détecté.</Text>
          <Text style={styles.suggestionText}>
            Ajoutez un collier GPS pour suivre vos animaux en temps réel.
          </Text>
          <TouchableOpacity style={styles.buyButton} onPress={() => console.log('Acheter un collier GPS')}>
            <Text style={styles.buyButtonText}>Acheter un collier GPS</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject, // La carte prend toute la page
  },
  noGpsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  noGpsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginVertical: 10,
  },
  suggestionText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  buyButton: {
    backgroundColor: '#5E72E4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

//export default TrackPetsScreen;
