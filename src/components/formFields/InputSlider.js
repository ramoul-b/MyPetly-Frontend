import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const InputSlider = ({ label, value, onChange, unit = 'kg', min = 0, max = 50, step = 1 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{parseFloat(value).toFixed(2)} {unit}</Text>
      </View>

      <MultiSlider
        values={[parseFloat(value)]} // <<< ICI on force la valeur correcte
        min={min}
        max={max}
        step={step}
        sliderLength={280}
        onValuesChangeFinish={(val) => onChange(val[0])} 
        selectedStyle={{ backgroundColor: '#4A3AFF' }}
        unselectedStyle={{ backgroundColor: '#ccc' }}
        markerStyle={{ backgroundColor: '#4A3AFF' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  valueContainer: {
    marginBottom: 8,
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A3AFF',
  },
});

export default InputSlider;
