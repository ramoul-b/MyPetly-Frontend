import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const InputSlider = ({ label, value, onChange, unit = 'kg', min = 0, max = 50 }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value} {unit}</Text>
    <MultiSlider
      values={[value]}
      min={min}
      max={max}
      onValuesChange={vals => onChange(vals[0])}
      sliderLength={280}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 20, alignItems: 'center', marginBottom: 10 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  value: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#4A3AFF' },
});

export default InputSlider;
