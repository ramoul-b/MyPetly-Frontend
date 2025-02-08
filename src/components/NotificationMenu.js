import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AppIcon from './AppIcon';
import { useTranslation } from 'react-i18next';

const NotificationMenu = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.iconContainer}>
        <AppIcon name="notifications-outline" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.menu}>
            <Text style={styles.title}>{t('home.notifications')}</Text>
            <Text style={styles.empty}>{t('home.no_notifications')}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: { marginRight: 10 },
  overlay: { flex: 1, alignItems: 'flex-end', marginTop: 100, marginRight: 50 },
  menu: {
    width: 200, backgroundColor: '#fff', borderRadius: 10, padding: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4,
    elevation: 5
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  empty: { fontSize: 14, color: 'gray', textAlign: 'center' },
});

export default NotificationMenu;
