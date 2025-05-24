import React from 'react';
import { FlatList } from 'react-native';
import MarketplaceStyles from '../../assets/styles/MarketplaceStyles';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => <ProductCard product={item} />}
      contentContainerStyle={MarketplaceStyles.productGrid}
    />
  );
};

export default ProductGrid;
