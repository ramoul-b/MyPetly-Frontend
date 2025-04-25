import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardAnimal = ({ pet, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* ENTÊTE */}
      <View style={styles.rowTop}>
      <Image source={{ uri: pet.photo }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.race}>{pet.breed}</Text>

          <View style={styles.detailRow}>
            <Icon name="calendar" size={16} color="#333" />
            <Text style={styles.detailText}>Né le {pet.birth_date || '--'}</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="needle" size={16} color="#e53935" />
            <Text style={styles.detailText}>{pet.last_vaccine || 'Aucun vaccin'}</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="calendar-clock" size={16} color="#3f51b5" />
            <Text style={styles.detailText}>{pet.next_appointment || 'Aucun rendez-vous'}</Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View style={[styles.badge, pet.status === 'active' ? styles.badgeActive : styles.badgeLost]}>
            <Icon name="check-circle" size={14} color="#fff" />
            <Text style={styles.badgeText}>{pet.status === 'active' ? 'Actif' : 'Perdu'}</Text>
          </View>
          {pet.collar_type?.toLowerCase() === 'gps' && (
            <Icon name="crosshairs-gps" size={20} color="#3f51b5" style={{ marginTop: 8, position: 'absolute', top : -8,left:-22 }} />
          )}
        </View>
        <View style={styles.actions}>
  <TouchableOpacity onPress={() => onEdit(pet)}>
    <Icon name="pencil" size={20} color="#3f51b5" style={styles.actionIcon} />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => onDelete(pet.id)}>
    <Icon name="trash-can" size={20} color="#e53935" style={styles.actionIcon} />
  </TouchableOpacity>
</View>

      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Icon name="thermometer" size={18} color="#e53935" />
          <Text style={styles.statLabel}>{pet.temp || '--'}</Text>
          <Text style={styles.statTitle}>Temp</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="heart-pulse" size={18} color="#e53935" />
          <Text style={styles.statLabel}>{pet.heart_rate || '--'}</Text>
          <Text style={styles.statTitle}>Rythme</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="run" size={18} color="#e53935" />
          <Text style={styles.statLabel}>{pet.activity || '--'}</Text>
          <Text style={styles.statTitle}>Activité</Text>
        </View>
        
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  rowTop: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
  },
  race: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  detailText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#444',
  },
  statusContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeActive: {
    backgroundColor: '#4CAF50',
  },
  badgeLost: {
    backgroundColor: '#F44336',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e53935',
  },
  statTitle: {
    fontSize: 12,
    color: '#777',
  },
  actions: {
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
  top: 57,
  right: 4,
},
actionIcon: {
  marginLeft: 8,
},

});

export default CardAnimal;
