import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader';
import AppIcon from '../components/AppIcon';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    fetchUserData();
  }, []);

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
        {/* Bloc Photo de Profil */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={() => console.log('Changer la photo')}>
            <Image
              source={user?.photo_url ? { uri: user.photo_url } : require('../assets/imgs/default-profile.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>{user?.name || 'Utilisateur'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'email@example.com'}</Text>
        </View>

        {/* Bloc Informations Personnelles */}
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <AppIcon name="person-outline" size={20} color="#555" />
            <Text style={styles.infoText}>{user?.name || 'Nom inconnu'}</Text>
          </View>
          <View style={styles.infoRow}>
            <AppIcon name="mail-outline" size={20} color="#555" />
            <Text style={styles.infoText}>{user?.email || 'email@example.com'}</Text>
          </View>
          {user?.phone && (
            <View style={styles.infoRow}>
              <AppIcon name="call-outline" size={20} color="#555" />
              <Text style={styles.infoText}>{user.phone}</Text>
            </View>
          )}
          {user?.address && (
            <View style={styles.infoRow}>
              <AppIcon name="location-outline" size={20} color="#555" />
              <Text style={styles.infoText}>{user.address}</Text>
            </View>
          )}
        </View>

        {/* Bloc Paramètres */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.settingsRow} onPress={() => console.log('Changer la langue')}>
            <AppIcon name="globe-outline" size={20} color="#555" />
            <Text style={styles.settingsText}>{t('profile.language')}</Text>
          </TouchableOpacity>

          <View style={styles.settingsRow}>
            <AppIcon name="notifications-outline" size={20} color="#555" />
            <Text style={styles.settingsText}>{t('profile.notifications')}</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={(value) => setNotificationsEnabled(value)}
            />
          </View>

          <TouchableOpacity style={styles.settingsRow} onPress={() => console.log('Changer le mot de passe')}>
            <AppIcon name="lock-closed-outline" size={20} color="#555" />
            <Text style={styles.settingsText}>{t('profile.change_password')}</Text>
          </TouchableOpacity>
        </View>

        {/* Bloc Déconnexion */}
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
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  infoText: { marginLeft: 10, fontSize: 16, color: '#333' },
  settingsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  settingsText: { marginLeft: 10, fontSize: 16, color: '#333' },
  logoutButton: { backgroundColor: '#E53935', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default Profile;
