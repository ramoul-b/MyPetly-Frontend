import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const animals = [
  { id: 1, name: 'Rex', image: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Mimi', image: 'https://via.placeholder.com/100' },
];

const AnimalCarousel = ({ navigation }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {animals.map(animal => (
        <TouchableOpacity key={animal.id} style={styles.animalCard} onPress={() => navigation.navigate('AnimalDetails', { id: animal.id })}>
          <Image source={{ uri: animal.image }} style={styles.image} />
          <Text style={styles.name}>{animal.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  animalCard: { marginRight: 10, alignItems: 'center' },
  image: { width: 100, height: 100, borderRadius: 50 },
  name: { marginTop: 5, fontWeight: 'bold' },
});

export default AnimalCarousel;
