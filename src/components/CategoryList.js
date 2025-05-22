import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import CategoryListStyles from "../assets/styles/CategoryListStyles";
import Theme from "../constants/Theme";
import useServices from '../hooks/useServices';

const CategoryList = () => {
  const navigation = useNavigation();
  const { services: categories, loading } = useServices();

  if (loading) return null;

  return (
    <View style={CategoryListStyles.container}>
      <View style={CategoryListStyles.header}>
        <Text style={CategoryListStyles.title}>What are you looking for?</Text>
        <TouchableOpacity onPress={() => console.log('See All pressed')}>
          <Text style={CategoryListStyles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              CategoryListStyles.category,
              {
                backgroundColor: '#F5F5F5',
                borderColor: item.category?.color || Theme.COLORS.PRIMARY
              }
            ]}
            onPress={() => navigation.navigate('ServiceProviders', { serviceId: item.id, serviceName: item.name?.en })}
          >
            <Icon
              name={item.category?.icon || 'pets'}
              size={22}
              color={item.category?.color || Theme.COLORS.PRIMARY}
              style={CategoryListStyles.icon}
            />
            <Text style={[CategoryListStyles.text, { color: Theme.COLORS.TEXT_PRIMARY }]}>
              {item.name?.en}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={CategoryListStyles.list}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryList;
