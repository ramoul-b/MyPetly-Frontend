import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';
import FloatingButton from '../components/FloatingButton';
import CardAnimal from '../components/CardAnimal';
import { getPets } from '../components/ServiceList';

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
