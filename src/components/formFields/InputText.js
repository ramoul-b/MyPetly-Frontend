import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputText = ({ label, value, onChangeText, placeholder = '' }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || label}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  label: { fontSize: 13, color: '#666', marginBottom: 4 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
});

export default InputText;
