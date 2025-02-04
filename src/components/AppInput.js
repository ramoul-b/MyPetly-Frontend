import React from 'react';
import { Input } from 'react-native-elements';

const AppInput = ({ placeholder, icon, value, onChangeText, secureTextEntry }) => {
  return (
    <Input
      placeholder={placeholder}
      leftIcon={{ type: 'ionicon', name: icon }}
      containerStyle={{ marginBottom: 15 }}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default AppInput;
