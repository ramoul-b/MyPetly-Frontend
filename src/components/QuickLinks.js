import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const links = [
  { id: 1, name: 'Mon Profil', route: 'Profile' },
  { id: 2, name: 'Paramètres', route: 'Settings' },
  { id: 3, name: 'Aide', route: 'Help' },
];

const QuickLinks = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔗 Navigation rapide</Text>
      {links.map(link => (
        <TouchableOpacity key={link.id} style={styles.link} onPress={() => navigation.navigate(link.route)}>
          <Text style={styles.linkText}>{link.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  link: { marginTop: 5, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  linkText: { fontSize: 16, color: '#5E72E4' },
});

export default QuickLinks;
