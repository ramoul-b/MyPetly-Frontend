import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next'; // ✅ ajouter i18n
import AppHeader from '../components/AppHeader';
import { animalService } from '../services/animalService';

const PetDetailsScreen = () => {
  const { t } = useTranslation(); // ✅ hook traduction
  const route = useRoute();
  const navigation = useNavigation();
  const { petId } = route.params;

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await animalService.getAnimal(petId);
        console.log('[PetDetailsScreen] Animal récupéré :', data);

        setPet({
          id: data.id,
          name: data.name,
          species: data.species,
          breed: data.breed,
          birthdate: data.birthdate,
          status: data.status,
          photo: data.photo_url,
          collar: data.collar_type,
          gender: data.sex || t('common.male'), // fallback traduit
          vaccinated: true,  
          neutered: true,    
          microchipped: true,
          friendlyWithKids: true,
          friendlyWithCats: false,
          healthHistory: [],
          upcomingEvents: [],
          stats: { temperature: '-', heartRate: '-', activity: '-' },
          reminders: [],
        });

      } catch (error) {
        console.error('Erreur chargement animal :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [petId, t]);

  if (loading) return <Text style={styles.error}>{t('common.loading')}</Text>;
  if (!pet) return <Text style={styles.error}>{t('common.not_found')}</Text>;

  return (
    <View style={styles.container}>
      <AppHeader title={t('profile.my_pets')} navigation={navigation} />

      <TouchableOpacity
        style={{ position: 'absolute', top: 70, left: 20, zIndex: 1 }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={28} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Avatar */}
        <View style={styles.avatarBlock}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: pet.photo }} style={styles.avatar} />
          </View>
          <Text style={styles.petName}>{pet.name}</Text>
          <Text style={styles.petSpecies}>{pet.species}</Text>

          <View style={styles.petMetaRow}>
            <Text style={styles.status}>{pet.status?.toUpperCase()}</Text>
            <View style={styles.collarBadge}>
              <Icon name="map-marker-radius" size={18} color="#fff" />
              <Text style={styles.badgeText}>{pet.collar}</Text>
            </View>
          </View>
        </View>

        {/* Informations générales */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('pet.general_info')}</Text>
          <InfoRow label={t('pet.breed')} value={pet.breed} />
          <InfoRow label={t('pet.gender')} value={pet.gender} />
          <InfoRow label={t('pet.birthdate')} value={pet.birthdate || '--'} />
          <InfoRow label={t('pet.microchipped')} value={pet.microchipped ? t('common.yes') : t('common.no')} />
        </View>

        {/* Statistiques santé */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('pet.health_stats')}</Text>
          <View style={styles.statsRow}>
            <StatCard icon="thermometer" label={t('pet.temperature')} value={pet.stats.temperature} />
            <StatCard icon="heart-pulse" label={t('pet.heart_rate')} value={pet.stats.heartRate} />
            <StatCard icon="run" label={t('pet.activity')} value={pet.stats.activity} />
          </View>
        </View>

        {/* Infos supplémentaires */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('pet.health_info')}</Text>
          <ToggleRow label={t('pet.vaccinated')} value={pet.vaccinated} />
          <ToggleRow label={t('pet.neutered')} value={pet.neutered} />
        </View>

        {/* Historique santé */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('pet.health_history')}</Text>
          {pet.healthHistory.length === 0 ? (
            <Text style={styles.note}>{t('common.no_history')}</Text>
          ) : (
            pet.healthHistory.map((item, i) => (
              <View key={i} style={styles.historyItem}>
                <Icon name="medical-bag" size={20} color="#5E72E4" />
                <View style={{ marginLeft: 10 }}>
                  <Text>{item.title} - {item.date}</Text>
                  <Text style={styles.note}>{item.note}</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Évènements à venir */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('pet.upcoming_events')}</Text>
          {pet.upcomingEvents.length === 0 ? (
            <Text style={styles.note}>{t('common.no_events')}</Text>
          ) : (
            pet.upcomingEvents.map((event, i) => (
              <View key={i} style={styles.historyItem}>
                <Icon name={event.icon} size={20} color="#E76F51" />
                <Text style={{ marginLeft: 10 }}>{event.label} – {event.date}</Text>
              </View>
            ))
          )}
        </View>

        {/* Rappels */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('pet.reminders')}</Text>
          <Text style={styles.reminderNote}>
            {t('pet.add_reminders')}
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
            <TouchableOpacity style={styles.reminderCard}>
              <Icon name="plus-circle" size={30} color="#5E72E4" />
              <Text style={styles.reminderLabel}>{t('common.add')}</Text>
            </TouchableOpacity>

            {pet.reminders.map((reminder, i) => (
              <View key={i} style={styles.reminderCard}>
                <Icon name={reminder.icon} size={26} color="#5E72E4" />
                <Text style={styles.reminderLabel}>{reminder.label}</Text>
                <Text style={styles.reminderDate}>{reminder.date}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Bouton Edit */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('EditPet', { petId: pet.id })}
        >
          <Text style={styles.editBtnText}>{t('common.edit_info')}</Text>
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

const StatCard = ({ icon, label, value }) => (
  <View style={styles.statCard}>
    <Icon name={icon} size={24} color="#E63946" />
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
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