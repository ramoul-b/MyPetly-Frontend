// AppSelect.js
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';

const AppSelect = ({ selectedValue, onValueChange, options }) => {
  return (
    <View>
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  );
};

export default AppSelect;
