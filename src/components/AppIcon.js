// AppIcon.js
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const AppIcon = ({ name, size = 24, color = 'black' }) => {
  return <Icon name={name} size={size} color={color} />;
};

export default AppIcon;