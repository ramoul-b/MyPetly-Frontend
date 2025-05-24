import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { getMyAppointments } from '../services/bookingService';
import AppointmentCard from '../components/AppointmentCard';

const COLORS = {
  primary: '#4F46E5',
  textDark: '#0F172A',
  textGrey: '#64748B',
  bg: '#F8FAFC',
  track: '#E2E8F0',
};

export default function MyAppointmentsScreen() {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('upcoming'); // ou 'past'

  const handleEdit = (item) => {
    // navigation ou modal pour modifier le RDV
    console.log('ok');
  };

  const handleCancel = (item) => {
    console.log('ok1');
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyAppointments();
        setAppointments(data);
      } catch (e) {
        console.error('Erreur chargement RDV', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const now = new Date();
  const filtered = appointments.filter(a => {
    const date = new Date(`${a.appointment_date}T${a.time}`);
    return tab === 'upcoming' ? date >= now : date < now;
  });

  /* ——— RENDER ——— */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t('appointments:title', 'Mes rendez-vous')}</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setTab('upcoming')}
          style={[styles.pill, tab === 'upcoming' && styles.pillActive]}>
          <Text
            style={[
              styles.pillText,
              tab === 'upcoming' && styles.pillTextActive,
            ]}>
            {t('appointments:upcoming', 'À venir')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('past')}
          style={[styles.pill, tab === 'past' && styles.pillActive]}>
          <Text
            style={[
              styles.pillText,
              tab === 'past' && styles.pillTextActive,
            ]}>
            {t('appointments:past', 'Passés')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <AppointmentCard
        item={item}
        onEdit={handleEdit}
        onCancel={handleCancel}
         />}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={filtered.length ? undefined : styles.flexGrow}
      />
    </SafeAreaView>
  );
}

/* ——— EMPTY STATE ——— */
const EmptyState = () => (
  <View style={styles.emptyWrap}>
    <View style={styles.emptyIcon}>
      <Icon name="time-outline" size={64} color="#CBD5E1" />
    </View>
    <Text style={styles.emptyText}>Aucun rendez-vous</Text>
    <TouchableOpacity style={styles.btn}>
      <Text style={styles.btnText}>Trouver un spécialiste</Text>
    </TouchableOpacity>
  </View>
);

/* ——— STYLES ——— */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 20 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
    color: COLORS.textDark,
  },
  /* Tabs */
  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.track,
    borderRadius: 28,
    padding: 4,
    marginBottom: 20,
  },
  pill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: 'center',
  },
  pillActive: { backgroundColor: COLORS.primary },
  pillText: { color: COLORS.textGrey, fontSize: 15, fontWeight: '600' },
  pillTextActive: { color: '#FFF' },

  /* Empty */
  emptyWrap: { flex: 1, alignItems: 'center', marginTop: 60 },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { marginTop: 24, fontSize: 16, color: COLORS.textGrey },
  btn: {
    marginTop: 32,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
  },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  /* Misc */
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  flexGrow: { flexGrow: 1 },
});

