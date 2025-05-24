import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BookingSuccess() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { date, slot, providerName } = params;

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon name="checkmark-circle-outline" size={100} color="#FFF" />
      </View>

      <Text style={styles.title}>Your appointment has been booked</Text>
      <Text style={styles.sub}>with {providerName}</Text>

      <View style={styles.appointmentBox}>
        <Icon name="calendar-outline" size={18} color="#FFF" />
        <Text style={styles.appointmentText}>
          {formattedDate} at {slot}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MyAppointments')}
      >
        <Text style={styles.buttonText}>Go to my appointments</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3E78FF' },
  iconWrapper: {
    backgroundColor: '#5D90FF',
    borderRadius: 100,
    padding: 30,
    marginBottom: 30,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#FFF', textAlign: 'center' },
  sub: { fontSize: 16, color: '#FFF', marginTop: 6 },
  appointmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C60DC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 20,
  },
  appointmentText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    borderWidth: 1,
    borderColor: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 28,
    marginTop: 30,
  },
  buttonText: { color: '#FFF', fontWeight: '700' },
});
