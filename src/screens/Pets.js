import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // ✅ importer le hook i18n
import AppHeader from '../components/AppHeader';
import FloatingButton from '../components/FloatingButton';
import CardAnimal from '../components/CardAnimal';
import { useAnimals } from '../hooks/useAnimals';

const PetsScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation(); // ✅ hook pour traduire
  const { animals, loading, error, fetchAnimals } = useAnimals();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAnimals();
  }, []);

  const filteredPets = animals.filter(pet => filter === 'all' || pet.status === filter);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <AppHeader title={t('profile.my_pets')} navigation={navigation} />

      {/* FILTRES */}
      <View style={styles.filterContainer}>
        <FilterButton label={t('filters.all')} selected={filter === 'all'} onPress={() => setFilter('all')} />
        <FilterButton label={t('filters.lost')} selected={filter === 'lost'} onPress={() => setFilter('lost')} />
        <FilterButton label={t('filters.active')} selected={filter === 'active'} onPress={() => setFilter('active')} />
      </View>

      {/* LOADING */}
      {loading && <Text style={styles.loadingText}>{t('common.loading')}</Text>}
      {error && <Text style={styles.errorText}>{t('common.error_loading')}</Text>}

      {/* LISTE DES ANIMAUX */}
      <FlatList
        data={filteredPets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardAnimal
            pet={item}
            onPress={() => navigation.navigate('PetDetails', { petId: item.id })}
          />
        )}
        ListEmptyComponent={!loading && <Text style={styles.emptyText}>{t('common.no_animals')}</Text>}
        contentContainerStyle={{ paddingBottom: 80 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />

      {/* AJOUT */}
      <FloatingButton icon="add" onPress={() => navigation.navigate('AddPet')} />
    </View>
  );
};

// Composant bouton de filtre
const FilterButton = ({ label, selected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.filterButton, selected && styles.activeFilter]}
  >
    <Text style={[styles.filterText, selected && { color: '#fff' }]}>{label}</Text>
  </TouchableOpacity>
);

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 8,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  activeFilter: { backgroundColor: '#4CAF50' },
  filterText: { fontSize: 14, fontWeight: '600', color: '#333' },
  loadingText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#777' },
  errorText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: 'red' },
  emptyText: { textAlign: 'center', fontSize: 15, fontStyle: 'italic', color: '#999', marginTop: 40 },
});

export default PetsScreen;
