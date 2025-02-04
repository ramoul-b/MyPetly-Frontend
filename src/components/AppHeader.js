// AppHeader.js
import React from 'react';
import { Header } from 'react-native-elements';

const AppHeader = ({ title, leftComponent, rightComponent }) => {
  return (
    <Header
      centerComponent={{ text: title, style: { color: '#fff', fontSize: 18 } }}
      leftComponent={leftComponent}
      rightComponent={rightComponent}
      containerStyle={{ backgroundColor: '#5E72E4' }}
    />
  );
};

export default AppHeader;