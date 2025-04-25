import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputField = ({ label, value, onChangeText, placeholder }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || label}
      placeholderTextColor="#aaa"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
});

export default InputField;
