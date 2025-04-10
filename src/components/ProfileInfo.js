import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import AppIcon from './AppIcon';
import { userService } from '../services/userService';

const ProfileInfo = () => {
  const user = useSelector(state => state.auth.user);
  const [isEditing, setIsEditing] = useState({ name: false, phone: false, address: false });
  const [editedUser, setEditedUser] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    if (user) {
      setEditedUser({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleEditToggle = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (field) => {
    try {
      const updatedData = { [field]: editedUser[field] };
      await userService.updateProfile(updatedData);
      setIsEditing(prev => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  const handleCancel = (field) => {
    setEditedUser(prev => ({ ...prev, [field]: user ? user[field] : '' }));
    setIsEditing(prev => ({ ...prev, [field]: false }));
  };

  return (
    <View>
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

      <View style={styles.card}>
        {['name', 'phone', 'address'].map((field) => (
          <View key={field} style={styles.infoRow}>
            <AppIcon
              name={
                field === 'name'
                  ? 'person-outline'
                  : field === 'phone'
                  ? 'call-outline'
                  : 'location-outline'
              }
              size={20}
              color="#555"
            />
            {isEditing[field] ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editedUser[field]}
                  onChangeText={(value) => handleInputChange(field, value)}
                  keyboardType={field === 'phone' ? 'phone-pad' : 'default'}
                  autoFocus
                />
                <TouchableOpacity onPress={() => handleSave(field)}>
                  <AppIcon name="checkmark-outline" size={20} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCancel(field)}>
                  <AppIcon name="close-outline" size={20} color="red" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.infoText}>{user?.[field] || `Ajouter ${field}`}</Text>
                <TouchableOpacity onPress={() => handleEditToggle(field)}>
                  <AppIcon name="create-outline" size={20} color="#007AFF" />
                </TouchableOpacity>
              </>
            )}
          </View>
        ))}

        <View style={styles.infoRow}>
          <AppIcon name="mail-outline" size={20} color="#555" />
          <Text style={styles.infoText}>{user?.email || 'email@example.com'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSection: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  profileName: { fontSize: 20, fontWeight: 'bold' },
  profileEmail: { fontSize: 14, color: '#666' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  infoText: { marginLeft: 10, fontSize: 16, color: '#333', flex: 1 },
  input: { marginLeft: 10, fontSize: 16, color: '#333', borderBottomWidth: 1, flex: 1 },
});

export default ProfileInfo;
