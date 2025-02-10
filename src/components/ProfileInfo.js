// src/components/ProfileInfo.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AppIcon from './AppIcon';
import { updateUser } from '../redux/actions/userActions';

const ProfileInfo = () => {
  const dispatch = useDispatch();
  // On récupère l'utilisateur depuis le slice "user" ou sinon depuis "auth"
  const user = useSelector(state => state.user.user) || useSelector(state => state.auth.user);

  // États locaux pour gérer l'édition de chaque champ
  const [isEditing, setIsEditing] = useState({ name: false, phone: false, address: false });
  const [editedUser, setEditedUser] = useState({ name: '', phone: '', address: '' });

  // Initialisation des états locaux lors du montage ou quand "user" change
  useEffect(() => {
    if (user) {
      setEditedUser({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  // Lance le mode édition pour un champ donné
  const handleEditToggle = (field) => {
    console.log(`Activation du mode édition pour le champ: ${field}`);
    setIsEditing(prev => ({ ...prev, [field]: true }));
  };

  // Met à jour la valeur locale pour le champ
  const handleInputChange = (field, value) => {
    console.log(`Modification locale du champ ${field}: ${value}`);
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  // Sauvegarde la modification en dispatchant l'action updateUser et quitte le mode édition
  const handleSave = (field) => {
    console.log(`handleSave appelé pour le champ: ${field}`);
    console.log(`Valeur actuelle dans editedUser[${field}]:`, editedUser[field]);
    const updatedData = { [field]: editedUser[field] };
    dispatch(updateUser(updatedData))
      .then(() => {
        console.log("Mise à jour réussie, state Redux mis à jour.");
        // Optionnel : forcer la mise à jour locale à partir du state Redux si besoin
        // setEditedUser({ ...editedUser, [field]: user[field] });
        setIsEditing(prev => ({ ...prev, [field]: false }));
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour:", error);
      });
  };
  

  // Annule l'édition et rétablit la valeur d'origine
  const handleCancel = (field) => {
    console.log(`Annulation de l'édition pour le champ: ${field}`);
    setEditedUser(prev => ({ ...prev, [field]: user ? user[field] : '' }));
    setIsEditing(prev => ({ ...prev, [field]: false }));
  };

  return (
    <View>
      {/* Section 1 : Profil utilisateur */}
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

      {/* Section 2 : Informations personnelles */}
      <View style={styles.card}>
        {/* Champ Nom */}
        <View style={styles.infoRow}>
          <AppIcon name="person-outline" size={20} color="#555" />
          {isEditing.name ? (
            <>
              <TextInput
                style={styles.input}
                value={editedUser.name}
                onChangeText={(value) => handleInputChange('name', value)}
                autoFocus
              />
              <TouchableOpacity onPress={() => handleSave('name')}>
                <AppIcon name="checkmark-outline" size={20} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCancel('name')}>
                <AppIcon name="close-outline" size={20} color="red" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.infoText}>{user?.name || 'Nom inconnu'}</Text>
              <TouchableOpacity onPress={() => handleEditToggle('name')}>
                <AppIcon name="create-outline" size={20} color="#007AFF" />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Champ Email (non modifiable) */}
        <View style={styles.infoRow}>
          <AppIcon name="mail-outline" size={20} color="#555" />
          <Text style={styles.infoText}>{user?.email || 'email@example.com'}</Text>
        </View>

        {/* Champ Numéro de téléphone */}
        <View style={styles.infoRow}>
          <AppIcon name="call-outline" size={20} color="#555" />
          {isEditing.phone ? (
            <>
              <TextInput
                style={styles.input}
                value={editedUser.phone}
                keyboardType="phone-pad"
                onChangeText={(value) => handleInputChange('phone', value)}
                autoFocus
              />
              <TouchableOpacity onPress={() => handleSave('phone')}>
                <AppIcon name="checkmark-outline" size={20} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCancel('phone')}>
                <AppIcon name="close-outline" size={20} color="red" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.infoText}>{user?.phone || 'Ajouter un numéro'}</Text>
              <TouchableOpacity onPress={() => handleEditToggle('phone')}>
                <AppIcon name="create-outline" size={20} color="#007AFF" />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Champ Adresse */}
        <View style={styles.infoRow}>
          <AppIcon name="location-outline" size={20} color="#555" />
          {isEditing.address ? (
            <>
              <TextInput
                style={styles.input}
                value={editedUser.address}
                onChangeText={(value) => handleInputChange('address', value)}
                autoFocus
              />
              <TouchableOpacity onPress={() => handleSave('address')}>
                <AppIcon name="checkmark-outline" size={20} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCancel('address')}>
                <AppIcon name="close-outline" size={20} color="red" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.infoText}>{user?.address || 'Ajouter une adresse'}</Text>
              <TouchableOpacity onPress={() => handleEditToggle('address')}>
                <AppIcon name="create-outline" size={20} color="#007AFF" />
              </TouchableOpacity>
            </>
          )}
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
