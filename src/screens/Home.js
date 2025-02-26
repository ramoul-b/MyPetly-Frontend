import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import AppHeader from '../components/AppHeader';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import BannerSlider from '../components/AdBanner';
import ShoppingCategories from '../components/ShoppingCategories';
import AnimalCarousel from '../components/AnimalCarousel';
import ServiceList from '../components/ServiceList';
import { useTranslation } from 'react-i18next';
import HomeStyles from "../styles/HomeStyles";
import ReminderCarousel from '../components/ReminderCarousel';
import BlogCommunitySection from '../components/BlogCommunitySection';


const Home = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <View style={HomeStyles.container}>
      {/* Header */}
      <AppHeader title={t('home.title')} navigation={navigation} />

      <ScrollView  showsVerticalScrollIndicator={false}>
        {/* Carrousel des rappels et notifications  */}
        <ReminderCarousel />
        {/* Search Bar */}
        <SearchBar />

        {/* Catégories principales */}
        <CategoryList navigation={navigation} />

        {/* Bannière promotionnelle */}
        <BannerSlider />

        {/* Shopping Categories */}
        <ShoppingCategories navigation={navigation} />

        <BlogCommunitySection navigation={navigation} />



      </ScrollView>
    </View>
  );
};



export default Home;
