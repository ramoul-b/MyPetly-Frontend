import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MarketplaceStyles from '../../assets/styles/MarketplaceStyles';

const SearchBar = () => {
  return (
    <View style={MarketplaceStyles.searchBarContainer}>
      <Icon name="search" size={20} color="#888" />
      <TextInput placeholder="Search for products..." style={{ flex: 1, marginLeft: 10 }} />
      <Icon name="filter" size={20} color="#888" />
    </View>
  );
};

export default SearchBar;
