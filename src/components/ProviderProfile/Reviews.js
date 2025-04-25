import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProviderProfileStyles from '../../assets/styles/ProviderProfileStyles';

const Reviews = ({ reviews, onWriteReview }) => (
  <View style={ProviderProfileStyles.reviewsSectionContainer}>
    {/* Titre + Bouton Voir tout */}
    <View style={ProviderProfileStyles.reviewsSectionHeader}>
      <Text style={ProviderProfileStyles.reviewsSectionTitle}>Reviews</Text>
      <TouchableOpacity>
        <Text style={ProviderProfileStyles.reviewsViewAll}>
          View all {reviews.length} reviews <Icon name="chevron-right" size={16} color="#4A6CF7" />
        </Text>
      </TouchableOpacity>
    </View>

    {/* Carrousel des avis */}
    <FlatList
      data={reviews}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={ProviderProfileStyles.reviewCard}>
          {/* Avatar + Nom */}
          <View style={ProviderProfileStyles.reviewCardHeader}>
          <Image
  source={typeof item.avatar === 'string' ? { uri: item.avatar } : item.avatar}
  style={ProviderProfileStyles.reviewCardAvatar}
/>

            <View>
              <Text style={ProviderProfileStyles.reviewCardUser}>{item.user}</Text>
              <View style={ProviderProfileStyles.reviewCardStars}>
                {[...Array(5)].map((_, index) => (
                  <Icon key={index} name="star" size={16} color="#FFC107" />
                ))}
              </View>
            </View>
          </View>

          {/* Commentaire */}
          <Text style={ProviderProfileStyles.reviewCardText}>{item.comment}</Text>

          {/* Badge vérifié + date */}
          <View style={ProviderProfileStyles.reviewCardFooter}>
            <View style={ProviderProfileStyles.reviewCardVerifiedBadge}>
              <Icon name="check-circle" size={14} color="#4CAF50" />
              <Text style={ProviderProfileStyles.reviewCardVerifiedText}>a verified review</Text>
            </View>
            <Text style={ProviderProfileStyles.reviewCardDate}>{item.date}</Text>
          </View>
 
        </View>
      )}
    />
              {/* Bouton "Write a Review" */}
              <TouchableOpacity style={ProviderProfileStyles.writeReviewButton} onPress={onWriteReview}>
      <Icon name="edit" size={20} color="#4A6CF7" />
      <Text style={ProviderProfileStyles.writeReviewText}>Write a Review</Text>
    </TouchableOpacity>
  </View>
);

export default Reviews;
