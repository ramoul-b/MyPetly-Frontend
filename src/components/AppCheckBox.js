// AppCheckBox.js
import React from 'react';
import { CheckBox } from 'react-native-elements';

const AppCheckBox = ({ title, checked, onPress }) => {
  return (
    <CheckBox
      title={title}
      checked={checked}
      onPress={onPress}
      containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
    />
  );
};

export default AppCheckBox;