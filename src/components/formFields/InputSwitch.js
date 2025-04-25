import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const InputSwitch = ({ label, value, onValueChange }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
});

export default InputSwitch;
