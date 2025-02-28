import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProviderProfileStyles from '../../styles/ProviderProfileStyles';

const days = [
  { id: '1', day: '6', label: 'Sun' },
  { id: '2', day: '7', label: 'Mon' },
  { id: '3', day: '8', label: 'Tue' },
  { id: '4', day: '9', label: 'Wed' },
  { id: '5', day: '10', label: 'Thu' },
  { id: '6', day: '11', label: 'Fri' },
  { id: '7', day: '12', label: 'Sat' },
];

const Schedule = ({ schedule }) => {
  const [selectedDay, setSelectedDay] = useState('9'); // Par défaut, le 9 est sélectionné

  return (
    <View style={ProviderProfileStyles.scheduleContainer}>
      {/* En-tête du calendrier */}
      <View style={ProviderProfileStyles.scheduleHeader}>
        <Icon name="calendar-today" size={20} color="#4A4A4A" />
        <Text style={ProviderProfileStyles.scheduleMonth}>September</Text>
        <TouchableOpacity>
          <Icon name="chevron-right" size={24} color="#4A4A4A" />
        </TouchableOpacity>
      </View>

      {/* Liste des jours */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={ProviderProfileStyles.daysList}>
        {days.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              ProviderProfileStyles.dayItem,
              selectedDay === item.day && ProviderProfileStyles.selectedDayItem,
            ]}
            onPress={() => setSelectedDay(item.day)}
          >
            <Text style={ProviderProfileStyles.dayNumber}>{item.day}</Text>
            <Text style={ProviderProfileStyles.dayLabel}>{item.label}</Text>
            {selectedDay === item.day && <View style={ProviderProfileStyles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Liste des créneaux horaires */}
      <FlatList
        horizontal
        data={schedule}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={ProviderProfileStyles.timeSlot}>
            <Text style={ProviderProfileStyles.timeText}>{item}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={ProviderProfileStyles.timeList}
      />
    </View>
  );
};

export default Schedule;
