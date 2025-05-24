import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';

const InputSelect = ({ label, value, onValueChange, items }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNPickerSelect
        onValueChange={onValueChange}
        value={value}
        items={items}
        placeholder={{ label: `Sélectionner ${label}`, value: null }}
        style={{
          inputIOS: styles.input,
          inputAndroid: styles.input,
          placeholder: styles.placeholder,
          iconContainer: {
            top: 10,
            right: 10,
          },
          modalViewMiddle: {
            backgroundColor: '#fff', // ✅ fond blanc options iOS
          },
          viewContainer: {
            backgroundColor: '#fff',
          },
        }}
        useNativeAndroidPickerStyle={false}
        Icon={() => <Icon name="chevron-right" size={20} color="#999" />}
      />
      <View style={styles.underline} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    fontSize: 16,
    paddingVertical: 10,
    paddingRight: 30,
    color: '#333',
    backgroundColor: '#fff',
  },
  placeholder: {
    color: '#aaa',
  },
  underline: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 4,
  },
});

export default InputSelect;
