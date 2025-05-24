import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Experience = ({ experiences }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Professional Experience</Text>
    {experiences.map((item, index) => (
      <View key={index} style={styles.experienceItem}>
        <Icon name="check-circle" size={20} color="#4CAF50" />
        <Text style={styles.text}>{item}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  experienceItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  text: { fontSize: 14, color: '#333', marginLeft: 10 },
});

export default Experience;
