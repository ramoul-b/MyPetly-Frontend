import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';

const mockPets = [
  {
    id: 1,
    name: 'Max',
    species: 'Chien',
    breed: 'Golden Retriever',
    birthdate: '2021-04-15',
    status: 'actif',
    photo: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
    collar: 'GPS',
    gender: 'Male',
    vaccinated: true,
    neutered: true,
    microchipped: true,
    friendlyWithKids: true,
    friendlyWithCats: false,
    healthHistory: [
      { type: 'Vaccin', title: 'Rage', date: '2023-06-15', note: 'Rappel annuel.' },
      { type: 'Consultation', title: 'Vétérinaire', date: '2024-02-01', note: 'Contrôle général.' },
    ],
    upcomingEvents: [
      { icon: 'calendar', label: 'Vaccin Rage', date: '2024-06-15' },
      { icon: 'bell-ring', label: 'Rendez-vous vétérinaire', date: '2024-04-22' },
      { icon: 'test-tube', label: 'Rappel vermifuge', date: '2024-05-10' },
    ],
    stats: {
      temperature: '38.5°C',
      heartRate: '90 bpm',
      activity: 'Modérée',
    },
    reminders: [
  { type: 'Vaccin', label: 'Measles vaccine', date: '2024-05-01', icon: 'needle' },
  { type: 'Vaccin', label: 'Rabies vaccine', date: '2024-06-10', icon: 'needle' },
],

  },
  
];

const PetDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { petId } = route.params;
  const pet = mockPets.find((p) => p.id === petId);

  if (!pet) return <Text style={styles.error}>Animal non trouvé</Text>;

  return (
    <View style={styles.container}>
      <AppHeader title="Mon animal" navigation={navigation} />
      <TouchableOpacity
  style={{  position: 'absolute', top: 70, left: 20, zIndex: 1,  }}
  onPress={() => navigation.goBack()}
>
  <Icon name="arrow-left" size={28} color="#fff" />
</TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Dashboard Animal */}
        <View style={styles.avatarBlock}>
  <View style={styles.avatarWrapper}>
    <Image source={{ uri: pet.photo }} style={styles.avatar} />
    <TouchableOpacity style={styles.addPhotoIcon}>
      <Icon name="plus-circle" size={28} color="#5E72E4" />
    </TouchableOpacity>
  </View>
  <Text style={styles.petName}>{pet.name}</Text>
  <Text style={styles.petSpecies}>{pet.species}</Text>

  <View style={styles.petMetaRow}>
    <Text style={styles.status}>🟢 ACTIF</Text>
    <View style={styles.collarBadge}>
      <Icon name="map-marker-radius" size={18} color="#fff" />
      <Text style={styles.badgeText}>GPS</Text>
    </View>
  </View>
</View>


        {/* Informations générales */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informations générales</Text>
          <InfoRow label="Race" value={pet.breed} />
          <InfoRow label="Genre" value={pet.gender} />
          <InfoRow label="Date de naissance" value={pet.birthdate} />
          <InfoRow label="Puce" value={pet.microchipped ? 'Oui' : 'Non'} />
        </View>
        {/* Statistiques santé */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Statistiques santé</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Icon name="thermometer" size={24} color="#E63946" />
              <Text style={styles.statLabel}>Température</Text>
              <Text style={styles.statValue}>{pet.stats.temperature}</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="heart-pulse" size={24} color="#E63946" />
              <Text style={styles.statLabel}>Rythme</Text>
              <Text style={styles.statValue}>{pet.stats.heartRate}</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="run" size={24} color="#E63946" />
              <Text style={styles.statLabel}>Activité</Text>
              <Text style={styles.statValue}>{pet.stats.activity}</Text>
            </View>
          </View>
        </View>
        {/* Infos supplémentaires */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Infos santé</Text>
          <ToggleRow label="Vacciné" value={pet.vaccinated} />
          <ToggleRow label="Stérilisé" value={pet.neutered} />
        </View>

        {/* Historique santé */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Historique santé</Text>
          {pet.healthHistory.map((item, i) => (
            <View key={i} style={styles.historyItem}>
              <Icon name="medical-bag" size={20} color="#5E72E4" />
              <View style={{ marginLeft: 10 }}>
                <Text>{item.title} - {item.date}</Text>
                <Text style={styles.note}>{item.note}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Évènements à venir */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Évènements à venir</Text>
          {pet.upcomingEvents.map((event, i) => (
            <View key={i} style={styles.historyItem}>
              <Icon name={event.icon} size={20} color="#E76F51" />
              <Text style={{ marginLeft: 10 }}>{event.label} – {event.date}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
  <Text style={styles.sectionTitle}>Rappels</Text>
  <Text style={styles.reminderNote}>
    Ajoutez des rappels pour les vaccins, coupes, vermifuges... Vous recevrez une notification.
  </Text>

  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
    <TouchableOpacity style={styles.reminderCard}>
      <Icon name="plus-circle" size={30} color="#5E72E4" />
      <Text style={styles.reminderLabel}>Ajouter</Text>
    </TouchableOpacity>

    {pet.reminders?.map((reminder, i) => (
      <View key={i} style={styles.reminderCard}>
        <Icon name={reminder.icon} size={26} color="#5E72E4" />
        <Text style={styles.reminderLabel}>{reminder.label}</Text>
        <Text style={styles.reminderDate}>{reminder.date}</Text>
      </View>
    ))}
  </ScrollView>
</View>


        <TouchableOpacity
  style={styles.editBtn}
  onPress={() => navigation.navigate('EditPet', { petId: pet.id })}
>
  <Text style={styles.editBtnText}>Modifier les informations</Text>
</TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const ToggleRow = ({ label, value }) => (
  <View style={styles.toggleRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Switch value={value} disabled />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  content: { padding: 20, paddingBottom: 100 },
  dashboard: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoDashboard: { flex: 1 },
  editPhotoBtn: { alignSelf: 'flex-end', marginTop: 6 },
  editPhotoText: { color: '#5E72E4', fontWeight: 'bold' },
  card: {   backgroundColor: '#FFF',  borderRadius: 16,  padding: 16,  marginVertical: 10,  elevation: 2,  shadowColor: '#000',  shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' },
  infoLabel: { fontSize: 14, color: '#555' },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#333' },
  editBtn: { backgroundColor: '#5E72E4', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  editBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  error: { marginTop: 100, textAlign: 'center', fontSize: 18, color: 'red' },
  historyItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  note: { fontSize: 12, color: '#888' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statCard: { flex: 1, backgroundColor: '#f0f0f0', padding: 10, margin: 5, borderRadius: 12, alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#555', marginTop: 4 },
  statValue: { fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 2 },
  avatarBlock: {
  alignItems: 'center',
  marginVertical: 20,
},
avatarWrapper: {
  position: 'relative',
},
petName: {
  fontSize: 22,
  fontWeight: 'bold',
  marginTop: 10,
  color: '#333',
},
petSpecies: {
  fontSize: 14,
  color: '#777',
},
petMetaRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 8,
  gap: 12,
},
status: {
  fontSize: 12,
  backgroundColor: '#d4edda',
  color: '#155724',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 12,
  fontWeight: 'bold',
},
collarBadge: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#5E72E4',
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 8,
},
badgeText: {
  color: '#fff',
  fontSize: 12,
  marginLeft: 4,
},
avatar: {
  width: 150,
  height: 150,
  borderRadius: 75,
  borderWidth: 4,
  borderColor: '#fff',
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 6,
  elevation: 3,
},
addPhotoIcon: {
  position: 'absolute',
  bottom: 4,
  right: 4,
  backgroundColor: '#fff',
  borderRadius: 30,
  padding: 2,
  elevation: 2,
},
reminderNote: {
  fontSize: 13,
  color: '#777',
},
reminderCard: {
  width: 120,
  backgroundColor: '#f5f5f5',
  borderRadius: 14,
  padding: 12,
  marginRight: 10,
  alignItems: 'center',
  justifyContent: 'center',
},
reminderLabel: {
  fontSize: 13,
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
  marginTop: 6,
},
reminderDate: {
  fontSize: 12,
  color: '#999',
  marginTop: 2,
},


});

export default PetDetailsScreen;