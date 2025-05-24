import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

const COLORS = {
  primary: '#4F46E5',
  textDark: '#0F172A',
  textGrey: '#64748B',
  bgCard: '#FFFFFF',
  danger: '#E2E8F0',
};

export default function AppointmentCard({
  item,
  lang = 'fr',
  onEdit = () => {},
  onCancel = () => {},
}) {
  /* sécurisation des données */
  const rating = Number(item?.provider?.rating) || 5;
  const reviews = Number(item?.provider?.reviews) || 0;

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={{ uri: item?.provider?.photo || 'https://via.placeholder.com/64' }}
          style={styles.avatar}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{item?.provider?.name?.[lang] || '-'}</Text>
          <Text style={styles.specialty}>{item?.provider?.specialization?.[lang] || ''}</Text>

          <View style={styles.metaRow}>
            <Icon name="star" size={14} color="#FACC15" />
            <Text style={styles.metaText}>{rating.toFixed(1)} · {reviews} avis</Text>
            <Icon name="location-outline" size={14} color={COLORS.textGrey} style={styles.metaIcon} />
            <Text style={styles.metaText}>{item?.distance_km ?? 0} km</Text>
            <Icon name="card-outline" size={14} color={COLORS.textGrey} style={styles.metaIcon} />
            <Text style={styles.metaText}>${item?.price ?? 0}</Text>
          </View>
        </View>
      </View>

      {/* BODY */}
      <View style={styles.bodyRow}>
        <Icon name="briefcase-outline" size={20} color={COLORS.primary} />
        <View style={styles.bodyInfo}>
          <Text style={styles.clinic}>{item?.clinic_name}</Text>
          <Text style={styles.address}>{item?.clinic_address}</Text>
        </View>
      </View>
      <View style={styles.bodyRow}>
        <Icon name="time-outline" size={20} color={COLORS.primary} />
        <Text style={styles.date}>
          {dayjs(item?.appointment_date).format('ddd D MMM')} — {item?.time}
        </Text>
      </View>

      {/* FOOTER ACTIONS */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => onEdit(item)}>
          <Text style={styles.btnPrimaryText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnGhost} onPress={() => onCancel(item)}>
          <Text style={styles.btnGhostText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  /* header */
  header: { flexDirection: 'row' },
  avatar: { width: 64, height: 64, borderRadius: 12 },
  headerInfo: { marginLeft: 12, flex: 1 },
  name: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  specialty: { fontSize: 14, color: COLORS.textGrey, marginTop: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  metaText: { fontSize: 12, color: COLORS.textGrey, marginLeft: 4 },
  metaIcon: { marginLeft: 12 },

  /* body */
  bodyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  bodyInfo: { marginLeft: 8 },
  clinic: { fontSize: 14, fontWeight: '600', color: COLORS.textDark },
  address: { fontSize: 12, color: COLORS.textGrey, marginTop: 2 },
  date: { fontSize: 14, color: COLORS.textDark, marginLeft: 8 },

  /* actions */
  actions: { flexDirection: 'row', marginTop: 20 },
  btnPrimary: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  btnPrimaryText: { color: '#FFF', fontWeight: '700' },
  btnGhost: {
    flex: 1,
    backgroundColor: COLORS.danger,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  btnGhostText: { color: COLORS.textDark, fontWeight: '700' },
});
