import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AdBannerStyles from "../styles/AdBannerStyles";

const AdBanner = () => {
  return (
    <View style={AdBannerStyles.container}>
      <Image source={require('../assets/imgs/3532842.png')} style={AdBannerStyles.banner} />
    </View>
  );
};

export default AdBanner;
