import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const services = [
  { id: 1, name: 'Vétérinaire', route: 'VetServices' },
  { id: 2, name: 'Pet-sitter', route: 'PetSitter' },
];

const ServiceList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛍 Services</Text>
      {services.map(service => (
        <TouchableOpacity key={service.id} onPress={() => navigation.navigate(service.route)}>
          <Text style={styles.service}>{service.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  service: { marginTop: 5, fontSize: 16, color: '#5E72E4' },
});

export default ServiceList;
