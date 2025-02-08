// ProfileMenu.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AppIcon from './AppIcon';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
import { useNavigation } from '@react-navigation/native';


const ProfileMenu = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const handleLogout = async () => {
    try {
      // Dispatch de l'action logout qui s'occupe de la suppression du token, etc.
      dispatch(logoutUser());
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };
  const handleProfileInfo = () => {
    // Fermer le menu avant de naviguer
    setVisible(false);
    navigation.navigate("Profile");
  };


  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.iconContainer}>
        <AppIcon name="person-circle-outline" size={26} color="#fff" />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.menu}>
            <Text style={styles.title}>{t('profile.title')}</Text>
            <TouchableOpacity style={styles.option}  onPress={handleProfileInfo} >
              <AppIcon name="person-outline" size={20}  />
              <Text>{t('profile.info')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <AppIcon name="settings-outline" size={20} />
              <Text>{t('profile.settings')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={handleLogout}>
              <AppIcon name="log-out-outline" size={20} />
              <Text>{t('profile.logout')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: { marginLeft: 10 },
  overlay: { flex: 1, alignItems: 'flex-end', marginTop: 100, marginRight: 15 },
  menu: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  option: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 5 },
});

export default ProfileMenu;
