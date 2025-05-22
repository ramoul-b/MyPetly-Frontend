import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import { createIntent } from '../services/paymentService';
import { createBooking } from '../services/bookingService';
import Toast from 'react-native-toast-message';
import useBooking from '../hooks/useBooking';
import BannerSlider from '../components/AdBanner';
import { CardField } from '@stripe/stripe-react-native';


export default function BookingScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();

  // 👉 données reçues
const {
  providerId,
  serviceId, // 👈 ajoute ici
  providerName,
  providerPhoto,
  specialty,
  rating,
  reviews,
  price,
  schedule = ['09:00', '09:30', '10:00', '10:30', '12:00'],
} = params;


  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const { selectedSlot = schedule[0] } = params;
  const [slot, setSlot] = useState(selectedSlot);

  const { confirmPayment } = useStripe();
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
  setLoading(true);
     try {
    // ① PaymentIntent
    const clientSecret = await createIntent(price * 100);

    // ② Feuille de paiement
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
    });
    if (error) throw new Error(error.message);

    // ③ Création de la réservation
    const formattedDate = date.toISOString().slice(0,10); // "2025-05-18"
    await createBooking({
      service_id: serviceId,
      provider_id: providerId,
      appointment_date: formattedDate,
      time: slot,
      payment_intent: paymentIntent.id,
      currency: 'eur',
      notes: '',
  });


    navigation.replace('BookingSuccess', { date, slot, providerName });
  } catch (e) {
  console.log('❌ Booking error:', e?.response?.data || e.message);
  Toast.show({ type: 'error', text1: e.message });
} finally {
    setLoading(false);
  }
};

  return (
    <View style={s.container}>
      {/* header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={26} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Booking confirmation</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* provider bloc */}
      <View style={s.card}>
        <Image source={ typeof providerPhoto === 'string'
                ? { uri: providerPhoto }
                : providerPhoto } style={s.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={s.name}>{providerName}</Text>
          <Text style={s.sub}>{specialty}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Text style={s.star}>⭐ {rating}</Text>
            <Text style={s.sub}>   {reviews} Reviews</Text>
          </View>
        </View>
      </View>

      {/* date selector */}
      <TouchableOpacity style={s.dateRow} onPress={() => setShowPicker(true)}>
        <Text style={s.dateLabel}>Date</Text>
        <View style={s.dateRight}>
          <Text style={s.dateText}>
            {date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
          </Text>
          <Icon name="chevron-forward" size={18} />
        </View>
      </TouchableOpacity>

      {/* slots */}
      <FlatList
        data={schedule}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[s.slot, slot === item && s.slotSel]}
            onPress={() => setSlot(item)}
          >
            <Text style={[s.slotTxt, slot === item && { color: '#FFF' }]}>{item}</Text>
          </TouchableOpacity>
        )}
      />
<CardField
  postalCodeEnabled={false}
  placeholder={{
    number: '4242 4242 4242 4242',
  }}
  cardStyle={{
    backgroundColor: '#f6f6f6',
    textColor: '#000000',
    borderRadius: 8,
    fontSize: 16,
    placeholderColor: '#a0a0a0',
  }}
  style={{
    width: '100%',
    height: 50,
    marginVertical: 20,
  }}
/>

    {/* publicité */}
    <View style={{ marginTop: 16 }}>
      <BannerSlider />
    </View>

      {/* footer */}
      <View style={s.footer}>
        <Text style={s.price}>
          <Text style={s.bold}>${price}</Text> / first visit
        </Text>
       <TouchableOpacity
  style={[s.bookBtn, loading && { opacity: 0.5 }]}
  disabled={loading}
  onPress={handleBook}
>
  <Text style={s.bookTxt}>{loading ? '...' : 'Book'}</Text>
</TouchableOpacity>

      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
          onChange={(_, d) => {
            setShowPicker(false);
            if (d) setDate(d);
          }}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700' },
  card: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '700' },
  sub: { fontSize: 12, color: '#666' },
  star: { fontSize: 12, color: '#FFA500' },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderColor: '#EEE' },
  dateLabel: { color: '#999', fontSize: 12 },
  dateRight: { flexDirection: 'row', alignItems: 'center' },
  dateText: { marginRight: 6, fontSize: 14 },
  slot: { width: 80, height: 22, borderRadius: 24, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  slotSel: { backgroundColor: '#3949FF' },
  slotTxt: { fontSize: 16 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 },
  price: { fontSize: 18 },
  bold: { fontWeight: '700' },
  bookBtn: { backgroundColor: '#3949FF', paddingHorizontal: 40, paddingVertical: 12, borderRadius: 26 },
  bookTxt: { color: '#FFF', fontWeight: '700' },
});
