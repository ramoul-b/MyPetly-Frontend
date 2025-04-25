import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateAnimal, getAnimalById } from '../services/animalService';

import InputField from '../components/formFields/InputField';
import InputSelect from '../components/formFields/InputSelect';
import InputDate from '../components/formFields/InputDate';
import InputGender from '../components/formFields/InputGender';
import InputWeightSlider from '../components/formFields/InputSlider';
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

  useEffect(() => {
    loadPet();
  }, []);

  const loadPet = async () => {
    try {
      const data = await getAnimalById(petId);
      setForm({ ...form, ...data });
    } catch (err) {
      alert('Erreur de chargement');
    }
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateAnimal(petId, form);
      alert('Sauvegardé');
      navigation.goBack();
    } catch (err) {
      alert('Erreur de mise à jour');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.header}>Modifier l’animal</Text>

      <ProfileImagePicker image={form.photo} onChange={val => handleChange('photo', val)} />


      <Section title="Informations générales">
        <InputField label="Nom" value={form.name} onChangeText={val => handleChange('name', val)} />
        <InputSelect label="Espèce" value={form.species} onValueChange={val => handleChange('species', val)} items={SPECIES_OPTIONS} />
        <InputSelect label="Race" value={form.breed} onValueChange={val => handleChange('breed', val)} items={BREED_OPTIONS} />
        <InputGender value={form.gender} onChange={val => handleChange('gender', val)} />
        <InputField label="Couleur" value={form.color} onChangeText={val => handleChange('color', val)} />
        <InputDate label="Date de naissance" value={form.birth_date} onChange={val => handleChange('birth_date', val)} />
        <InputWeightSlider value={form.weight} onChange={val => handleChange('weight', val)} />
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
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#eee' },
  plusIcon: { position: 'absolute', bottom: 0, right: '40%', backgroundColor: '#4A3AFF', borderRadius: 15, padding: 4 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  switchLabel: { fontSize: 14, color: '#555' },
  button: { backgroundColor: '#4A3AFF', paddingVertical: 14, borderRadius: 10, marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: '600', textAlign: 'center', fontSize: 16 },
});

export default EditPetScreen;
