import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import FloatingButton from '../components/FloatingButton';
import CardAnimal from '../components/CardAnimal';
//import { getPets } from '../services/ServiceList';


export const getPets = async () => {
  return [
      {
          id: 1,
          name: "Max",
          species: "Chien",
          breed: "Golden Retriever",
          birthdate: "2021-04-15",
          status: "active",
          photo: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg",
          collar: "GPS",
      },
      {
          id: 2,
          name: "Milo",
          species: "Chat",
          breed: "Siamois",
          birthdate: "2020-08-22",
          status: "lost",
          photo: "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg",
          collar: "NFC",
      },
      {
          id: 3,
          name: "Bella",
          species: "Chien",
          breed: "Labrador",
          birthdate: "2019-06-10",
          status: "active",
          photo: "https://images.pexels.com/photos/257540/pexels-photo-257540.jpeg",
          collar: "QR Code",
      },
      {
          id: 4,
          name: "Luna",
          species: "Chat",
          breed: "Maine Coon",
          birthdate: "2022-02-05",
          status: "active",
          photo: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg",
          collar: "GPS",
      },
      {
          id: 5,
          name: "Rocky",
          species: "Chien",
          breed: "Bulldog",
          birthdate: "2018-11-03",
          status: "lost",
          photo: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
          collar: "None",
      }
  ];
};

const PetsScreen = () => {
    const navigation = useNavigation();
    const [pets, setPets] = useState([]);
    const [filter, setFilter] = useState('all'); // Filtrage par statut

    useEffect(() => {
        loadPets();
    }, []);

    const loadPets = async () => {
        const data = await getPets();
        setPets(data);
    };

    // Fonction de filtrage
    const filteredPets = pets.filter(pet => filter === 'all' || pet.status === filter);

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <AppHeader title={'Mes Animaux'} navigation={navigation} />

            {/* FILTRES */}
            <View style={styles.filterContainer}>
                <TouchableOpacity onPress={() => setFilter('all')} style={[styles.filterButton, filter === 'all' && styles.activeFilter]}>
                    <Text style={styles.filterText}>Tous</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('lost')} style={[styles.filterButton, filter === 'lost' && styles.activeFilter]}>
                    <Text style={styles.filterText}>Perdus</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('active')} style={[styles.filterButton, filter === 'active' && styles.activeFilter]}>
                    <Text style={styles.filterText}>Actifs</Text>
                </TouchableOpacity>
            </View>

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
                ListEmptyComponent={<Text style={styles.emptyText}>Aucun animal trouvé</Text>}
                contentContainerStyle={{ paddingBottom: 80 }}
            />

            {/* BOUTON FLOTTANT POUR AJOUTER UN ANIMAL */}
            <FloatingButton icon="add" onPress={() => navigation.navigate('AddPet')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginHorizontal: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    activeFilter: {
        backgroundColor: '#4CAF50',
    },
    filterText: {
        fontSize: 16,
        color: '#333',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: 20,
    },
});

export default PetsScreen;
