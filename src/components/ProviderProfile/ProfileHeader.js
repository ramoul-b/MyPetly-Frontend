import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'; // Dégradé
import ProviderProfileStyles from '../../styles/ProviderProfileStyles';

const ProfileHeader = ({ name, specialty, experience, rating, reviews, price, distance, image }) => {
  const navigation = useNavigation();

  return (
    <View style={ProviderProfileStyles.headerContainer}>

      {/* Image de fond */}
      <Image source={image} style={ProviderProfileStyles.backgroundImage} />

      {/* Barre supérieure avec retour, partage et favori */}
      <View style={ProviderProfileStyles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <View style={ProviderProfileStyles.topBarIcons}>
          <TouchableOpacity>
            <Icon name="ios-share" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="favorite-border" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Carte d'information du vétérinaire */}
      <View style={ProviderProfileStyles.infoCard}>
        <View style={{ flex: 1 }}>
          <Text style={ProviderProfileStyles.name}>{name}</Text>
          <Text style={ProviderProfileStyles.specialty}>{specialty}</Text>
          <Text style={ProviderProfileStyles.experience}>{experience}</Text>

          {/* Prix et distance */}
          <View style={ProviderProfileStyles.priceRow}>
            <View style={ProviderProfileStyles.infoItem}>
              <Icon name="attach-money" size={18} color="#333" />
              <Text style={ProviderProfileStyles.infoText}>{price}</Text>
            </View>
            <View style={ProviderProfileStyles.infoItem}>
              <Icon name="place" size={18} color="#333" />
              <Text style={ProviderProfileStyles.infoText}>{distance}</Text>
            </View>
          </View>
        </View>

        {/* Conteneur du badge + texte des reviews */}
        <View style={ProviderProfileStyles.ratingContainer}>
          <LinearGradient 
            colors={['#4596EA', '#4552CB']} // Dégradé de bleu foncé
            style={ProviderProfileStyles.ratingBadge}
          >
            <Text style={ProviderProfileStyles.ratingText}>{rating}</Text>
          </LinearGradient>
          <Text style={ProviderProfileStyles.reviewsText}>{reviews} reviews</Text>
        </View>

      </View>
    </View>
  );
};

export default ProfileHeader;
