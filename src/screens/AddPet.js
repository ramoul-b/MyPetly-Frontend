import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import ImagePickerComponent from '../components/ImagePickerComponent'; // Import du composant
import { animalService } from '../services/animalService';

const AddPetScreen = () => {
    const navigation = useNavigation();
    const [petData, setPetData] = useState({
        name: '',
        species: '',
        breed: '',
        birthdate: '',
        gender: '',
        size: '',
        photo: null,
    });

    // Mise à jour des champs
    const handleInputChange = (field, value) => {
        setPetData({ ...petData, [field]: value });
    };

    // Fonction pour récupérer la photo sélectionnée
    const handleImageSelected = (imageUri) => {
        setPetData({ ...petData, photo: imageUri });
    };

   const handleSubmit = async () => {
  try {
    // Prépare les données
    const formData = {
      name: petData.name,
      species: petData.species,
      breed: petData.breed,
      birthdate: petData.birthdate,
      gender: petData.gender,
      size: petData.size,
    };

    // Envoi de l’animal sans image
    const addedAnimal = await animalService.addAnimal(formData);
    console.log("✅ Animal ajouté :", addedAnimal);

    // Si image sélectionnée, upload
    if (petData.photo) {
      const imageData = {
        uri: petData.photo,
        type: 'image/jpeg',
        fileName: 'animal_image.jpg',
      };

      await animalService.uploadAnimalImage(addedAnimal.id, imageData);
      console.log("📷 Image uploadée avec succès");
    }

    navigation.goBack();
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout :", error);
    alert("Erreur lors de l’ajout de l’animal");
  }
};


    return (
        <View style={styles.container}>
            <AppHeader title="Ajouter un Animal" navigation={navigation} />

            <ScrollView contentContainerStyle={styles.form}>
                {/* Sélection de la Photo */}
                <ImagePickerComponent onImageSelected={handleImageSelected} />

                {/* Nom */}
                <Text style={styles.label}>Nom de l’animal</Text>
                <TextInput style={styles.input} placeholder="Ex: Buddy" value={petData.name} onChangeText={(text) => handleInputChange('name', text)} />

                {/* Espèce */}
                <Text style={styles.label}>Espèce</Text>
                <TextInput style={styles.input} placeholder="Ex: Chien, Chat..." value={petData.species} onChangeText={(text) => handleInputChange('species', text)} />

                {/* Race */}
                <Text style={styles.label}>Race</Text>
                <TextInput style={styles.input} placeholder="Ex: Labrador, Siamois..." value={petData.breed} onChangeText={(text) => handleInputChange('breed', text)} />

                {/* Date de naissance */}
                <Text style={styles.label}>Date de naissance</Text>
                <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={petData.birthdate} onChangeText={(text) => handleInputChange('birthdate', text)} />

                {/* Genre */}
                <Text style={styles.label}>Genre</Text>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.optionButton, petData.gender === 'Male' && styles.selectedOption]} onPress={() => handleInputChange('gender', 'Male')}>
                        <Text style={styles.optionText}>♂️ Mâle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.optionButton, petData.gender === 'Female' && styles.selectedOption]} onPress={() => handleInputChange('gender', 'Female')}>
                        <Text style={styles.optionText}>♀️ Femelle</Text>
                    </TouchableOpacity>
                </View>

                {/* Taille */}
                <Text style={styles.label}>Taille</Text>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.optionButton, petData.size === 'Petit' && styles.selectedOption]} onPress={() => handleInputChange('size', 'Petit')}>
                        <Text style={styles.optionText}>🐾 Petit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.optionButton, petData.size === 'Moyen' && styles.selectedOption]} onPress={() => handleInputChange('size', 'Moyen')}>
                        <Text style={styles.optionText}>🐕 Moyen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.optionButton, petData.size === 'Grand' && styles.selectedOption]} onPress={() => handleInputChange('size', 'Grand')}>
                        <Text style={styles.optionText}>🦮 Grand</Text>
                    </TouchableOpacity>
                </View>

                {/* Bouton Ajouter */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Ajouter</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    form: { padding: 20 },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 15, fontSize: 16, borderWidth: 1, borderColor: '#ccc' },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    buttonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
});

export default AddPetScreen;
