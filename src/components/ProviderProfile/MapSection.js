import React from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProviderProfileStyles from '../../styles/ProviderProfileStyles';

const MapSection = ({ location, name }) => {
  return (
    <View style={ProviderProfileStyles.mapContainer}>
      {/* Titre et adresse */}
      <View style={ProviderProfileStyles.mapHeader}>
        <Icon name="business-center" size={22} color="#4A4A4A" />
        <View style={ProviderProfileStyles.mapInfo}>
          <Text style={ProviderProfileStyles.mapTitle}>{name}</Text>
          <Text style={ProviderProfileStyles.mapAddress}>{location.address}</Text>
        </View>
      </View>

      {/* Carte avec itinéraire */}
      <MapView
        style={ProviderProfileStyles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title={name}
          description={location.address}
        />
        {/* Exemple d'itinéraire entre 2 points */}
        <Polyline
          coordinates={[
            { latitude: location.latitude - 0.01, longitude: location.longitude - 0.01 },
            { latitude: location.latitude, longitude: location.longitude },
          ]}
          strokeWidth={4}
          strokeColor="#2563EB"
        />
      </MapView>
    </View>
  );
};

export default MapSection;
