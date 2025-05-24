import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProviderProfileStyles from '../../assets/styles/ProviderProfileStyles';

const HighlightedReview = ({ review, onPress }) => {
  return (
    <View style={ProviderProfileStyles.highlightedReviewContainer}>
      {/* Texte de l’avis */}
      <Text style={ProviderProfileStyles.reviewText}>"{review.comment}"</Text>

      {/* Informations sur l’utilisateur */}
      <View style={ProviderProfileStyles.reviewInfo}>
        <Text style={ProviderProfileStyles.verifiedText}>a verified review</Text>
        <Icon name="check-circle" size={16} color="#4CAF50" />
      </View>

      {/* Note en étoiles */}
      <View style={ProviderProfileStyles.reviewStars}>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Icon
              key={index}
              name="star"
              size={18}
              color={index < review.rating ? '#FFC107' : '#E0E0E0'}
            />
          ))}
      </View>

      {/* Lien pour voir tous les avis */}
      <TouchableOpacity onPress={onPress}>
        <Text style={ProviderProfileStyles.viewAllReviewsText}>
          View all {review.totalReviews} reviews
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HighlightedReview;
