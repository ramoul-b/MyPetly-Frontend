import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MarketplaceStyles from '../../assets/styles/MarketplaceStyles';

const ProductCard = ({ product }) => {
  return (
    <TouchableOpacity style={MarketplaceStyles.productCard}>
      <Image source={{ uri: product.image }} style={{ width: '100%', height: 120, borderRadius: 10 }} />
      <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{product.name}</Text>
      <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>{product.price}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;
