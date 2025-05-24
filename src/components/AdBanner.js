import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AdBannerStyles from "../assets/styles/AdBannerStyles";

const AdBanner = () => {
  return (
    <View style={AdBannerStyles.container}>
      <Image source={require('../assets/imgs/3532843.jpeg')} style={AdBannerStyles.banner} />
    </View>
  );
};

export default AdBanner;
