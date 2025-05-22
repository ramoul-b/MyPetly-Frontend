import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ProviderProfileStyles from '../../assets/styles/ProviderProfileStyles';

const BookingButton = ({
  providerId,
  serviceId,
  providerName,
  providerPhoto,
  specialty,
  rating,
  reviews,
  price,
  schedule = ['09:00'],
}) => {
  const navigation = useNavigation();

  return (
    <View style={ProviderProfileStyles.fixedBookingContainer}>
      <View style={ProviderProfileStyles.bookingContent}>
        {/* Infos prix + rating */}
        <View>
          <Text style={ProviderProfileStyles.bookingPrice}>
            <Text style={ProviderProfileStyles.boldText}>{price}</Text> € / first visit
          </Text>

          <View style={ProviderProfileStyles.ratingContainerBooking}>
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="star"
                size={16}
                color={i < Math.floor(rating) ? '#FFC107' : '#D3D3D3'}
              />
            ))}
            <Text style={ProviderProfileStyles.reviewTextBooking}>
              {' '}({reviews})
            </Text>
          </View>
        </View>

        {/* Bouton */}
        <TouchableOpacity
          style={ProviderProfileStyles.bookingButton}
          onPress={() =>
            navigation.navigate('BookingScreen', {
              providerId,
              serviceId,
              providerName,
              providerPhoto,
              specialty,
              rating,
              reviews,
              price,
              schedule,
              selectedSlot: schedule?.[0] ?? '09:00', // ✅ Pré-sélection
            })
          }
        >
          <Text style={ProviderProfileStyles.bookingButtonText}>Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingButton;
