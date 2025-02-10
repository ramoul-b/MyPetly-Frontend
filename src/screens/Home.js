import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import AppHeader from '../components/AppHeader';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import BannerSlider from '../components/BannerSlider';
import ShoppingCategories from '../components/ShoppingCategories';
import AnimalCarousel from '../components/AnimalCarousel';
import ServiceList from '../components/ServiceList';
import { useTranslation } from 'react-i18next';

const Home = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <AppHeader title={t('home.title')} navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <SearchBar />

        {/* Catégories principales */}
        <CategoryList navigation={navigation} />

        {/* Bannière promotionnelle */}
        <BannerSlider />

        {/* Shopping Categories */}
        <ShoppingCategories navigation={navigation} />

        {/* Carrousel des animaux */}
        <AnimalCarousel navigation={navigation} />

        {/* Services proposés */}
        <ServiceList navigation={navigation} />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
});

export default Home;
