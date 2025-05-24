import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProviderProfileStyles from '../../assets/styles/ProviderProfileStyles';

const NearbyVets = ({ vets }) => (
  <View style={ProviderProfileStyles.nearbyVetsContainer}>
    <Text style={ProviderProfileStyles.nearbyVetsTitle}>Nearby Vet</Text>
    <FlatList
      data={vets}
      keyExtractor={(item) => item.id.toString()}
      horizontal={true} // Active le carrousel
      showsHorizontalScrollIndicator={false} // Cache la barre de défilement
      contentContainerStyle={ProviderProfileStyles.nearbyVetsList} 
      renderItem={({ item }) => (
        <View style={ProviderProfileStyles.vetCard}>
          <Image source={{ uri: item.image }} style={ProviderProfileStyles.vetImage} />
          <View style={ProviderProfileStyles.vetDetails}>
            <Text style={ProviderProfileStyles.vetName}>{item.name}</Text>
            <Text style={ProviderProfileStyles.vetSpecialty}>{item.specialty}</Text>

            {/* Étoiles + Nombre d'avis */}
            <View style={ProviderProfileStyles.vetRatingRow}>
              <Text style={ProviderProfileStyles.vetStars}>⭐ {item.rating}</Text>
              <Text style={ProviderProfileStyles.vetReviewCount}>({item.reviews} Reviews)</Text>
            </View>

            {/* Infos : expérience, distance, prix */}
            <View style={ProviderProfileStyles.vetInfoRow}>
              <Text style={ProviderProfileStyles.vetExperience}>
                {item.experience}
              </Text>
              <View style={ProviderProfileStyles.vetDistance}>
                <Icon name="place" size={16} color="#666" />
                <Text> {item.distance}</Text>
              </View>
              <View style={ProviderProfileStyles.vetPrice}>
                <Icon name="attach-money" size={16} color="#666" />
                <Text>{item.price}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    />
  </View>
);

export default NearbyVets;
