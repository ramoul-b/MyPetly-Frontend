import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppIcon from '../components/AppIcon';
import { useNavigation } from '@react-navigation/native';
import ProfileInfo from '../components/ProfileInfo';
import SecuritySettings from '../components/SecuritySettings';
import UsefulLinks from '../components/UsefulLinks';

const Profile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState({ name: false, phone: false, address: false });
  const [editedUser, setEditedUser] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setEditedUser(parsedUser);
      }
    };
    fetchUserData();
  }, []);

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (field) => {
    const updatedUser = { ...user, [field]: editedUser[field] };
    setUser(updatedUser);
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    handleEditToggle(field);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('user');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <AppHeader title={t('profile.title')} />

      <ScrollView contentContainerStyle={styles.content}>

      <ProfileInfo />
        {/* Section 3 : Sécurité & Connexion */}
        <SecuritySettings />
        {/* Section 4 : Liens utiles */}
        <UsefulLinks />

        {/* Section 5 : Déconnexion */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>{t('profile.logout')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  content: { padding: 20 },
  profileSection: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  profileName: { fontSize: 20, fontWeight: 'bold' },
  profileEmail: { fontSize: 14, color: '#666' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  infoText: { marginLeft: 10, fontSize: 16, color: '#333' },
  input: { marginLeft: 10, fontSize: 16, color: '#333', borderBottomWidth: 1, flex: 1 },
  settingsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  settingsText: { marginLeft: 10, fontSize: 16, color: '#333' },
  logoutButton: { backgroundColor: '#E53935', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  saveButton: { backgroundColor: '#5E72E4', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default Profile;
