import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AppIcon from './AppIcon'; // Utilisation du composant d'icônes

const CardAnimal = ({ pet, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            {/* PHOTO DE L’ANIMAL */}
            <Image source={{ uri: pet.photoUrl }} style={styles.image} />

            {/* INFORMATIONS */}
            <View style={styles.info}>
                <Text style={styles.name}>{pet.name}</Text>
                <Text style={styles.details}>{pet.species} - {pet.breed}</Text>

                {/* STATUT & COLLAR */}
                <View style={styles.statusContainer}>
                    <Text style={[styles.status, pet.status === 'lost' ? styles.lost : styles.active]}>
                        {pet.status === 'lost' ? 'Perdu' : 'Actif'}
                    </Text>

                    {/* ICONE DU COLLIER SI EXISTANT */}
                    {pet.collarType && (
                        <AppIcon name="shield-checkmark" size={20} color="blue" /> // Icône sécurisée pour indiquer un collier attaché
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        color: '#666',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    status: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 5,
    },
    lost: {
        color: 'red',
    },
    active: {
        color: 'green',
    },
});

export default CardAnimal;
