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
import { useTranslation } from 'react-i18next'; // ✅ ajouté
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { animalService } from '../services/animalService';
import InputField from '../components/formFields/InputField';
import InputSelect from '../components/formFields/InputSelect';
import InputDate from '../components/formFields/InputDate';
import InputGender from '../components/formFields/InputGender';
import InputSlider from '../components/formFields/InputSlider';
import ProfileImagePicker from '../components/formFields/ProfileImagePicker';
import { useAnimals } from '../hooks/useAnimals';
import EventBus from '../utils/EventBus';

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
  { label: 'none', value: 'none' },
];

const EditPetScreen = () => {
  const { t } = useTranslation(); // ✅ hook pour traduction
  const navigation = useNavigation();
  const { fetchAnimals } = useAnimals();
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
      const localUri = Platform.OS === 'ios' && !uri.startsWith('file://')
        ? `file://${uri}`
        : uri;
      handleChange('photo', localUri);

      const res = await animalService.uploadAnimalImage(petId, {
        uri: localUri,
        type: 'image/jpeg',
        fileName: `animal_${petId}.jpg`,
      });

      handleChange('photo', res.photo_url);
      EventBus.emit('refreshAnimals');

    } catch (e) {
      console.error('Erreur upload image', e);
      alert(t('common.upload_error'));
    }
  };

  useEffect(() => {
    async function fetchAnimal() {
      try {
        const data = await animalService.getAnimal(petId);
        setForm({
          ...data,
          gender: data.sex,
          photo: data.photo_url,
        });
      } catch (error) {
        console.error('Erreur chargement animal', error);
        alert(t('common.loading_error'));
      }
    }
    fetchAnimal();
  }, [petId, t]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const {
        name,
        species,
        breed,
        birth_date,
        color,
        weight,
        height,
        gender,
        identification_number,
        collar_type,
        status,
      } = form;
  
      const dataToSend = {
        name,
        species,
        breed,
        birth_date,
        color,
        weight,
        height,
        sex: gender,
        identification_number,
        collar_type,
        status,
      };

      await animalService.updateAnimal(petId, dataToSend);

      alert(t('common.update_success'));
      navigation.goBack();

    } catch (error) {
      console.error('Erreur update', error);
      alert(t('common.update_error'));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.header}>{t('pet.edit_pet')}</Text>

      <ProfileImagePicker image={form.photo} onImageSelected={handleImageSelected} />

      <Section title={t('pet.general_info')}>
        <InputField label={t('pet.name')} value={form.name} onChangeText={val => handleChange('name', val)} />
        <InputSelect label={t('pet.species')} value={form.species} onValueChange={val => handleChange('species', val)} items={SPECIES_OPTIONS} />
        <InputSelect label={t('pet.breed')} value={form.breed} onValueChange={val => handleChange('breed', val)} items={BREED_OPTIONS} />
        <InputGender value={form.gender} onChange={val => handleChange('gender', val)} />
        <InputField label={t('pet.color')} value={form.color} onChangeText={val => handleChange('color', val)} />
        <InputDate label={t('pet.birthdate')} value={form.birth_date} onChange={val => handleChange('birth_date', val)} />
        <InputSlider
          value={isNaN(form.weight) ? 0 : Number(form.weight)}
          onChange={val => handleChange('weight', val)}
        />
        <InputField label={t('pet.height')} value={form.height} onChangeText={val => handleChange('height', val)} />
        <InputField label={t('pet.identification_number')} value={form.identification_number} onChangeText={val => handleChange('identification_number', val)} />
      </Section>

      <Section title={t('pet.collar_status')}>
        <InputSelect label={t('pet.collar_type')} value={form.collar_type} onValueChange={val => handleChange('collar_type', val)} items={COLLAR_OPTIONS} />
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {t('pet.status')}: {form.status === 'active' ? t('pet.active') : t('pet.lost')}
          </Text>
          <Switch
            value={form.status === 'active'}
            onValueChange={() => handleChange('status', form.status === 'active' ? 'lost' : 'active')}
          />
        </View>
      </Section>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{t('common.save')}</Text>
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
