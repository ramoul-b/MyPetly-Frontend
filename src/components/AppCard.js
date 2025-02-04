// AppCard.js
import React from 'react';
import { Card } from 'react-native-elements';

const AppCard = ({ title, children }) => {
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      {children}
    </Card>
  );
};

export default AppCard;