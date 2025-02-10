
// src/components/SecuritySettings.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import AppIcon from './AppIcon';
import { useTranslation } from 'react-i18next';

const SecuritySettings = () => {
  const { t } = useTranslation();
  // On gère ici l'état du switch pour la 2FA ou les notifications (selon votre logique)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.card}>
      {/* Changer le mot de passe */}
      <TouchableOpacity 
        style={styles.settingsRow} 
        onPress={() => console.log('Changer le mot de passe')}
      >
        <AppIcon name="lock-closed-outline" size={20} color="#555" />
        <Text style={styles.settingsText}>{t('profile.change_password')}</Text>
      </TouchableOpacity>

      {/* 2FA / Notifications */}
      <View style={styles.settingsRow}>
        <AppIcon name="shield-checkmark-outline" size={20} color="#555" />
        <Text style={styles.settingsText}>{t('profile.2fa')}</Text>
        <Switch 
          value={notificationsEnabled} 
          onValueChange={(value) => setNotificationsEnabled(value)} 
        />
      </View>

      {/* Historique des connexions */}
      <TouchableOpacity 
        style={styles.settingsRow} 
        onPress={() => console.log('Voir historique des connexions')}
      >
        <AppIcon name="time-outline" size={20} color="#555" />
        <Text style={styles.settingsText}>{t('profile.login_history')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15, 
    elevation: 2 
  },
  settingsRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingVertical: 12 
  },
  settingsText: { 
    marginLeft: 10, 
    fontSize: 16, 
    color: '#333', 
    flex: 1 
  },
});

export default SecuritySettings;
