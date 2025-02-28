import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProviderProfileStyles from '../../styles/ProviderProfileStyles';

const BookingButton = ({ price, rating, reviews }) => (
  <View style={ProviderProfileStyles.fixedBookingContainer}>
    <View style={ProviderProfileStyles.bookingContent}>
      <View>
        <Text style={ProviderProfileStyles.bookingPrice}>
          <Text style={ProviderProfileStyles.boldText}>1{price}2</Text> / first visit
        </Text>
        <View style={ProviderProfileStyles.ratingContainerBooking}>
          {[...Array(5)].map((_, index) => (
            <Icon 
              key={index} 
              name="star" 
              size={16} 
              color={index < Math.floor(rating) ? "#FFC107" : "#D3D3D3"} 
            />
          ))}
          <Text style={ProviderProfileStyles.reviewTextBooking}> {reviews} Reviews</Text>
        </View>
      </View>
      <TouchableOpacity style={ProviderProfileStyles.bookingButton}>
        <Text style={ProviderProfileStyles.bookingButtonText}>Book</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default BookingButton;
