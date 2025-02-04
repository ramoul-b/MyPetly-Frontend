import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const reminders = [
  { id: 1, text: 'Vaccin de Rex - 10 Février' },
  { id: 2, text: 'Visite chez le vétérinaire - 15 Février' },
];

const ReminderList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Rappels</Text>
      {reminders.map(reminder => (
        <Text key={reminder.id} style={styles.reminder}>{reminder.text}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  reminder: { marginTop: 5, fontSize: 16 },
});

export default ReminderList;
