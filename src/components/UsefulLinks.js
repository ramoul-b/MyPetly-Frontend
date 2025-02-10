// src/components/UsefulLinks.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppIcon from './AppIcon';
import { useTranslation } from 'react-i18next';

const UsefulLinks = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.card}>
      {/* CGU / Conditions Générales */}
      <TouchableOpacity 
        style={styles.settingsRow} 
        onPress={() => console.log('Voir CGU')}
      >
        <AppIcon name="document-text-outline" size={20} color="#555" />
        <Text style={styles.settingsText}>{t('profile.terms_conditions')}</Text>
      </TouchableOpacity>

      {/* Support */}
      <TouchableOpacity 
        style={styles.settingsRow} 
        onPress={() => console.log('Ouvrir le support')}
      >
        <AppIcon name="help-circle-outline" size={20} color="#555" />
        <Text style={styles.settingsText}>{t('profile.support')}</Text>
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
    paddingVertical: 10 
  },
  settingsText: { 
    marginLeft: 10, 
    fontSize: 16, 
    color: '#333' 
  },
});

export default UsefulLinks;
