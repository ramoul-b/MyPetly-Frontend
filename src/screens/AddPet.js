import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import ProfileImagePicker from '../components/formFields/ProfileImagePicker';
import InputField from '../components/formFields/InputField';
import InputSelect from '../components/formFields/InputSelect';
import InputDate from '../components/formFields/InputDate';
import InputGender from '../components/formFields/InputGender';
import InputWeightSlider from '../components/formFields/InputSlider';
import { animalService } from '../services/animalService';

const SPECIES_OPTIONS = [
  { label: 'Chien', value: 'chien' },
  { label: 'Chat', value: 'chat' },
];

const BREED_OPTIONS = [
  { label: 'Labrador', value: 'labrador' },
  { label: 'Siamois', value: 'siamois' },
];

const SIZE_OPTIONS = [
  { label: 'Petit', value: 'Petit' },
  { label: 'Moyen', value: 'Moyen' },
  { label: 'Grand', value: 'Grand' },
];

const AddPetScreen = () => {
  const navigation = useNavigation();
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    birthdate: '',
    gender: 'male',
    size: '',
    color: '',
    weight: 0,
    height: '',
    identification_number: '',
    photo: null,
  });

  const handleInputChange = (field, value) => {
    setPetData({ ...petData, [field]: value });
  };

  const handleImageSelected = (imageUri) => {
    if (!imageUri) return;
    setPetData({ ...petData, photo: imageUri });
  };

  const handleSubmit = async () => {
    try {
      const { photo, ...formData } = petData;
      const addedAnimal = await animalService.addAnimal(formData);

      if (photo) {
        const imageData = {
          uri: photo,
          type: 'image/jpeg',
          fileName: `animal_${addedAnimal.id}.jpg`,
        };
        await animalService.uploadAnimalImage(addedAnimal.id, imageData);
      }

      navigation.goBack();
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout :", error);
      alert("Erreur lors de l’ajout de l’animal");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader title="Ajouter un Animal" navigation={navigation} />
      <ScrollView style={{ padding: 16 }}>
        <ProfileImagePicker image={petData.photo} onImageSelected={handleImageSelected} />

        <Section title="Informations générales">
          <InputField label="Nom" value={petData.name} onChangeText={val => handleInputChange('name', val)} />
          <InputSelect label="Espèce" value={petData.species} onValueChange={val => handleInputChange('species', val)} items={SPECIES_OPTIONS} />
          <InputSelect label="Race" value={petData.breed} onValueChange={val => handleInputChange('breed', val)} items={BREED_OPTIONS} />
          <InputGender value={petData.gender} onChange={val => handleInputChange('gender', val)} />
          <InputField label="Couleur" value={petData.color} onChangeText={val => handleInputChange('color', val)} />
          <InputDate label="Date de naissance" value={petData.birthdate} onChange={val => handleInputChange('birthdate', val)} />
          <InputWeightSlider value={petData.weight} onChange={val => handleInputChange('weight', val)} />
          <InputField label="Taille (cm)" value={petData.height} onChangeText={val => handleInputChange('height', val)} keyboardType="numeric" />
          <InputField label="N° d'identification" value={petData.identification_number} onChangeText={val => handleInputChange('identification_number', val)} />
        </Section>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const Section = ({ title, children }) => (
  <View style={{ marginBottom: 24 }}>
    <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10 }}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4A3AFF',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AddPetScreen;
