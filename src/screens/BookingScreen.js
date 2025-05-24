import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { CardForm, useStripe } from '@stripe/stripe-react-native';
import { createIntent } from '../services/paymentService';
import { createBooking } from '../services/bookingService';
import Toast from 'react-native-toast-message';
import BannerSlider from '../components/AdBanner';

export default function BookingScreen() {
  // Params
  const { params } = useRoute();
  const navigation = useNavigation();
  const {
    providerId,
    serviceId,
    providerName,
    providerPhoto,
    specialty,
    rating,
    reviews,
    price,
    schedule = ['09:00', '09:30', '10:00', '10:30', '12:00'],
    selectedSlot,
  } = params;

  // States
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [slot, setSlot] = useState(selectedSlot ?? schedule[0]);
  const [cardDetails, setCardDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const { confirmPayment } = useStripe();

  // Booking action
  const handleBook = async () => {
    setErr('');
    if (!cardDetails?.complete) {
      const msg = 'Veuillez compléter la carte.';
      setErr(msg);
      Toast.show({ type: 'error', text1: msg, position: 'bottom' });
      return;                              
    }
    setLoading(true);
    try {
      const clientSecret = await createIntent(price * 100);
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            name: cardDetails?.billingDetails?.name,
          },
        },
      });
      if (error) throw new Error(error.message);

      await createBooking({
        service_id: serviceId,
        provider_id: providerId,
        appointment_date: date.toISOString().slice(0, 10),
        time: slot,
        payment_intent: paymentIntent.id,
        currency: 'eur',
        notes: '',
      });

      navigation.replace('BookingSuccess', { date, slot, providerName });
    } catch (e) {
      const msg = e?.response?.data?.message || e.message;
      setErr(msg);
      Toast.show({ type: 'error', text1: msg, position: 'bottom' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={26} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Booking confirmation</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Provider */}
      <View style={s.card}>
        <Image
          source={typeof providerPhoto === 'string' ? { uri: providerPhoto } : providerPhoto}
          style={s.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={s.name}>{providerName}</Text>
          <Text style={s.sub}>{specialty}</Text>
          <View style={s.ratingRow}>
            <Text style={s.star}>⭐ {rating}</Text>
            <Text style={s.sub}>   {reviews} Reviews</Text>
          </View>
        </View>
      </View>

      {/* Date */}
      <TouchableOpacity style={s.dateRow} onPress={() => setShowPicker(true)}>
        <Text style={s.dateLabel}>Date</Text>
        <View style={s.dateRight}>
          <Text style={s.dateText}>
            {date.toLocaleDateString('en-GB', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            })}
          </Text>
          <Icon name="chevron-forward" size={18} />
        </View>
      </TouchableOpacity>

      {/* Slots */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 4, minHeight: 30, maxHeight: 30 }}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {schedule.map((item) => (
          <TouchableOpacity
            key={item}
            style={[s.slot, slot === item && s.slotSel]}
            onPress={() => setSlot(item)}
          >
            <Text style={[s.slotTxt, slot === item && { color: '#FFF' }]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modern CardForm */}
      <View style={s.cardWrapper}>
        <CardForm
            style={{
                width: '100%',
                borderRadius: 18,
                backgroundColor: '#f6f8fc',
                padding: 120,
                marginVertical: 0,
                shadowColor: '#3949FF',
                shadowOpacity: 0.10,
                shadowRadius: 18,
                elevation: 6,
                borderWidth: 0,
                border:0,
                marginTop:50,
            }}
            cardStyle={{
                backgroundColor: '#fff',
                borderColor: '#e0e6ed',
                borderRadius: 14,
                fontSize: 20,
                marginBottom:0,
                border:0,
                textColor: '#232b43',
                placeholderColor: '#9daab6',
                fontFamily: Platform.OS === 'android' ? 'Roboto' : undefined,
            }}
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
              expiration: 'MM/YY',
              cvc: 'CVC',
              postalCode: 'Code Postal',
            }}
            onFormComplete={form => setCardDetails(form)}
            onFormChange={form => setCardDetails(form)}
        />
</View>


      {/* Ad banner */}
      <View style={{ marginTop: 12 }}>
        <BannerSlider />
      </View>

      {/* Footer */}
      {err !== '' && <Text style={s.error}>{err}</Text>}
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

      {/* Date picker modal */}
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
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700' },
  card: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  avatar: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '700' },
  sub: { fontSize: 12, color: '#666' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  star: { fontSize: 12, color: '#FFA500' },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#EEE' },
  dateLabel: { color: '#999', fontSize: 12 },
  dateRight: { flexDirection: 'row', alignItems: 'center' },
  dateText: { marginRight: 6, fontSize: 14 },
  slot: { width: 80, height: 22, borderRadius: 24, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  slotSel: { backgroundColor: '#3949FF' },
  slotTxt: { fontSize: 15 },
  cardField: { width: '100%', height: 92, marginTop: 2 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  price: { fontSize: 18 },
  bold: { fontWeight: '700' },
  bookBtn: { backgroundColor: '#3949FF', paddingHorizontal: 40, paddingVertical: 12, borderRadius: 26 },
  bookTxt: { color: '#FFF', fontWeight: '700' },
  error: { color: '#ff3333', marginTop: 6, marginBottom: -6 },
   cardWrapper: {
    width: '100%',
    padding: 16,
    borderRadius: 18,
    elevation: 5,
    marginTop: 12,
  },
});
