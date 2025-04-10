import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AppIcon from './AppIcon';
import ReminderBarStyles from '../styles/ReminderBarStyles';

const reminders = [
  { id: '1', type: 'appointment', message: "RDV Vétérinaire", icon: "calendar-outline", color: "#5E72E4" },
  { id: '2', type: 'vaccine', message: "Rappel Vaccin", icon: "medkit-outline", color: "#2DCE89" },
  { id: '3', type: 'alert', message: "Alerte Perte", icon: "alert-circle-outline", color: "#FB6340" },
  { id: '4', type: 'feeding', message: "Rappel Repas", icon: "fast-food-outline", color: "#FFA500" },
];

const ReminderBar = ({ navigation }) => (
  <View style={ReminderBarStyles.container}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {reminders.map((reminder) => (
        <TouchableOpacity
          key={reminder.id}
          style={[ReminderBarStyles.reminderItem, { backgroundColor: reminder.color + '0' }]}
          onPress={() => navigation.navigate('Notifications')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <AppIcon name={reminder.icon} size={24} color={reminder.color} />
            <Text style={ReminderBarStyles.reminderText}>{reminder.message}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

export default ReminderBar;
