import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const BannerSlider = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/imgs/banner.jpg')} style={styles.banner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginVertical: 10 },
  banner: { width: '100%', height: 120, borderRadius: 10 },
});

export default BannerSlider;
