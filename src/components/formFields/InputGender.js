import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InputGender = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Genre</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.option, value === 'male' && styles.active]}
          onPress={() => onChange('male')}
        >
          <Text style={[styles.text, value === 'male' && styles.activeText]}>♂️ Mâle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, value === 'female' && styles.active]}
          onPress={() => onChange('female')}
        >
          <Text style={[styles.text, value === 'female' && styles.activeText]}>♀️ Femelle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 18 },
  label: { fontSize: 13, color: '#666', marginBottom: 6 },
  row: { flexDirection: 'row', gap: 10 },
  option: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#4A3AFF',
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default InputGender;
