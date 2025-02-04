import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const categories = [
  { id: '1', name: 'Vet', icon: 'medical-services', type: 'material', color: '#6D9EEB' },
  { id: '2', name: 'Training', icon: 'self-improvement', type: 'material', color: '#FFBE5E' },
  { id: '3', name: 'Grooming', icon: 'spa', type: 'material', color: '#E57C94' },
];

const CategoryList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What are you looking for?</Text>
        <TouchableOpacity onPress={() => console.log('See All pressed')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.category, { backgroundColor: item.color }]}
            onPress={() => console.log(`Navigating to ${item.name}`)}
          >
            <Icon name={item.icon} type={item.type} size={30} color="white" />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginVertical: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  seeAll: { fontSize: 14, color: '#6D9EEB', fontWeight: 'bold' },
  list: { paddingVertical: 10 },
  category: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 90,
  },
  text: { fontSize: 14, fontWeight: 'bold', color: '#FFF', marginTop: 5 },
});

export default CategoryList;
