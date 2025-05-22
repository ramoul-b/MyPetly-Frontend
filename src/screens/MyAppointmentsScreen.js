import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getMyAppointments } from '../services/bookingService'; // à créer si non existant

export default function MyAppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('❌ Erreur chargement RDV :', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.provider}>{item.providerName}</Text>
      <Text style={styles.date}>
        {new Date(item.date).toLocaleDateString()} — {item.time}
      </Text>
    </View>
  );

  if (loading) return <Text>Chargement...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes rendez-vous</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Aucun rendez-vous trouvé.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  card: {
    backgroundColor: '#F2F2F2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  provider: { fontSize: 16, fontWeight: '600' },
  date: { marginTop: 5, color: '#666' },
});
