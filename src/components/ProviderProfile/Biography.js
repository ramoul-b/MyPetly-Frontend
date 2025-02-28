import React from 'react';
import { View, Text } from 'react-native';
import ProviderProfileStyles from '../../styles/ProviderProfileStyles';

const Biography = ({ bio }) => (
  <View style={ProviderProfileStyles.biographyContainer}>
    <Text style={ProviderProfileStyles.biographyTitle}>Biography</Text>
    <Text style={ProviderProfileStyles.biographyText}>{bio}</Text>
  </View>
  
);

export default Biography;
