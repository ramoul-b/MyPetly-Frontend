import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { animalService } from '../services/animalService';

import InputField from '../components/formFields/InputField';
import InputSelect from '../components/formFields/InputSelect';
import InputDate from '../components/formFields/InputDate';
import InputGender from '../components/formFields/InputGender';
import InputSlider from '../components/formFields/InputSlider';
import ProfileImagePicker from '../components/formFields/ProfileImagePicker';

const SPECIES_OPTIONS = [
  { label: 'Chien', value: 'chien' },
  { label: 'Chat', value: 'chat' },
];

const BREED_OPTIONS = [
  { label: 'Labrador', value: 'labrador' },
  { label: 'Berger Allemand', value: 'berger' },
  { label: 'Persan', value: 'persan' },
];

const COLLAR_OPTIONS = [
  { label: 'GPS', value: 'GPS' },
  { label: 'NFC', value: 'NFC' },
  { label: 'Aucun', value: 'none' },
];

const EditPetScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { petId } = route.params;

  const [form, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    color: '',
    weight: 0,
    height: '',
    birth_date: '',
    status: 'active',
    collar_type: '',
    last_vaccine: '',
    next_appointment: '',
    gender: 'male',
    identification_number: '',
    photo: '',
  });
  const handleImageSelected = async (uri) => {
    try {
      const imageData = {
        uri: uri,
        type: 'image/jpeg',
        fileName: `animal_${petId}.jpg`,
      };
  
      await animalService.uploadAnimalImage(petId, imageData); // ✅
      handleChange('photo', uri); // ✅ on met à jour l'affichage
  
    } catch (error) {
      console.error('Erreur upload image', error);
      alert('Erreur lors de l\'upload de l\'image');
    }
  };
  
  useEffect(() => {
    async function fetchAnimal() {
      try {
        const data = await animalService.getAnimal(petId);
        setForm(data);
      } catch (error) {
        console.error('Erreur chargement animal', error);
        alert('Erreur de chargement');
      }
    }
    fetchAnimal();
  }, [petId]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await animalService.updateAnimal(petId, form);
      alert('Animal mis à jour');
      navigation.goBack();
    } catch (error) {
      console.error('Erreur update', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.header}>Modifier l’animal</Text>

      <ProfileImagePicker image={form.photo} onImageSelected={handleImageSelected} />

      <Section title="Informations générales">
        <InputField label="Nom" value={form.name} onChangeText={val => handleChange('name', val)} />
        <InputSelect label="Espèce" value={form.species} onValueChange={val => handleChange('species', val)} items={SPECIES_OPTIONS} />
        <InputSelect label="Race" value={form.breed} onValueChange={val => handleChange('breed', val)} items={BREED_OPTIONS} />
        <InputGender value={form.gender} onChange={val => handleChange('gender', val)} />
        <InputField label="Couleur" value={form.color} onChangeText={val => handleChange('color', val)} />
        <InputDate label="Date de naissance" value={form.birth_date} onChange={val => handleChange('birth_date', val)} />
        <InputSlider value={form.weight} onChange={val => handleChange('weight', val)} />
        <InputField label="Taille (cm)" value={form.height} onChangeText={val => handleChange('height', val)} />
        <InputField label="N° d'identification" value={form.identification_number} onChangeText={val => handleChange('identification_number', val)} />
      </Section>

      <Section title="Collier & Statut">
        <InputSelect label="Type de collier" value={form.collar_type} onValueChange={val => handleChange('collar_type', val)} items={COLLAR_OPTIONS} />
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Statut: {form.status === 'active' ? 'Actif' : 'Perdu'}</Text>
          <Switch
            value={form.status === 'active'}
            onValueChange={() => handleChange('status', form.status === 'active' ? 'lost' : 'active')}
          />
        </View>
      </Section>

      <Section title="Suivi santé">
        <InputDate label="Dernier vaccin" value={form.last_vaccine} onChange={val => handleChange('last_vaccine', val)} />
        <InputDate label="Prochain rendez-vous" value={form.next_appointment} onChange={val => handleChange('next_appointment', val)} />
      </Section>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Sauvegarder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 16 },
  back: { marginBottom: 10 },
  header: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  switchLabel: { fontSize: 14, color: '#555' },
  button: { backgroundColor: '#4A3AFF', paddingVertical: 14, borderRadius: 10, marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: '600', textAlign: 'center', fontSize: 16 },
});

export default EditPetScreen;
