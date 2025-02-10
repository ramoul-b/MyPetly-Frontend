import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TrackPetsScreen() {
  return (
    <View style={styles.container}>
      <Text>📡 Suivi GPS des Animaux</Text>
      {/* TODO: Afficher une carte si GPS actif, sinon message d'incitation */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
