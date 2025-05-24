import React from 'react';
import { ScrollView, View, Text, StatusBar, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useProvider from '../hooks/useProvider';
import ProfileHeader from '../components/ProviderProfile/ProfileHeader';
import Schedule from '../components/ProviderProfile/Schedule';
import Biography from '../components/ProviderProfile/Biography';
import Experience from '../components/ProviderProfile/Experience';
import Reviews from '../components/ProviderProfile/Reviews';
import NearbyVets from '../components/ProviderProfile/NearbyVets';
import MapSection from '../components/ProviderProfile/MapSection';
import BookingButton from '../components/ProviderProfile/BookingButton';
import HighlightedReview from '../components/ProviderProfile/HighlightedReview';
import ProviderProfileStyles from '../assets/styles/ProviderProfileStyles';

const ProviderProfileScreen = () => {
  const { params } = useRoute();
  const providerId = params?.providerId;
  const serviceId = params?.serviceId;
  
  console.log('📍 Params reçu via navigation :', params);
  console.log('📍 ID du provider reçu via navigation :', providerId);
    console.log('📍 ID du Service reçu via navigation :', serviceId);
  const { provider, loading } = useProvider(providerId);
  
  console.log('📦 Données provider chargées :', provider);
  


  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }
  
  if (!provider) {
    return <Text>Provider introuvable</Text>;
  }
  
  const schedule = provider.schedule ?? ['09:00','09:30','10:00','10:30'];
  const backupImage = require('../assets/imgs/bailey-burton-8vlc3e_Tv-w-unsplash.jpg');
  return (
    <View style={ProviderProfileStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        <ProfileHeader
          name={provider.name.fr}
          specialty={provider.specialization.fr}
          rating={parseFloat(provider.rating)}
          reviews={25} // statique pour l’instant
          price="20€" // statique
          distance="1.5 km" // statique
          image={require('../assets/imgs/bailey-burton-8vlc3e_Tv-w-unsplash.jpg')}
        />

        <HighlightedReview
          review={{
            comment: "Très professionnel et à l'écoute des animaux.",
            totalReviews: 25,
          }}
          onPress={() => console.log('Navigate to all reviews')}
        />

        <Schedule schedule={["09:00", "09:30", "10:00", "10:30"]} />
        <MapSection location={{ latitude: 48.8566, longitude: 2.3522, address: provider.address }} name={provider.name.fr} />
        <Biography bio="Pas de biographie fournie pour le moment." />
        <Experience experiences={["10 ans d’expérience vétérinaire", "Formation continue en soins animaux"]} />
        <Reviews
          reviews={[
            {
              id: 1,
              user: 'Ann & Leo',
              date: '26.02.2019',
              comment: 'Très bon vétérinaire, je recommande.',
              avatar: require('../assets/imgs/members1-icon.jpg'),
            },
            {
              id: 2,
              user: 'John Doe',
              date: '14.08.2021',
              comment: 'Très professionnel avec mon chat.',
              avatar: require('../assets/imgs/members2-icon.jpg'),
            },
          ]}
          onWriteReview={() => console.log('Navigate to Write Review')}
        />
        <NearbyVets
          vets={[
            {
              id: '1',
              name: 'Dr. Marc Lefevre',
              specialty: 'Vétérinaire spécialiste',
              experience: '5 ans',
              rating: 4.6,
              reviews: 18,
              price: "18€",
              distance: "2 km",
              image: "https://images.unsplash.com/photo-1528747008803-d2415c6e0bf8",
            },
          ]}
        />
      </ScrollView>
      <View style={ProviderProfileStyles.fixedBookingContainer}>
      <BookingButton
        providerId={provider.id}
        serviceId={provider.id}
        providerName={provider.name.fr}
        providerPhoto={provider.photo ?? backupImage}
        specialty={provider.specialization.fr}
        rating={parseFloat(provider.rating)}
        reviews={25}
        price={20}
        schedule={schedule}
      />

      </View>
    </View>
  );
};

export default ProviderProfileScreen;
