import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileHeader from '../components/ProviderProfile/ProfileHeader';
import Schedule from '../components/ProviderProfile/Schedule';
import Biography from '../components/ProviderProfile/Biography';
import Experience from '../components/ProviderProfile/Experience';
import Reviews from '../components/ProviderProfile/Reviews';
import NearbyVets from '../components/ProviderProfile/NearbyVets';
import MapSection from '../components/ProviderProfile/MapSection';
import BookingButton from '../components/ProviderProfile/BookingButton';
import ProviderProfileStyles from '../styles/ProviderProfileStyles';
import HighlightedReview from '../components/ProviderProfile/HighlightedReview';

// Import de l'image du vétérinaire
const profileImage = require('../assets/imgs/bailey-burton-8vlc3e_Tv-w-unsplash.jpg');

// Import des avatars locaux
const avatar1 = require('../assets/imgs/members1-icon.jpg');
const avatar2 = require('../assets/imgs/members2-icon.jpg');
const avatar3 = require('../assets/imgs/members3-icon.jpg');
const avatar4 = require('../assets/imgs/members4-icon.jpg');
const avatar5 = require('../assets/imgs/members5-icon.jpg');

const providerData = {
  id: 1,
  name: 'Alekseenko Vasily',
  specialty: 'Veterinary Dentist',
  rating: 4.9,
  reviews: 125,
  experience: '10 years of experience',
  price: '$20',
  distance: '1.5 km',
  biography: `Master of Veterinary Medicine. Leading doctor at "Alden-Vet". Specialization: clinical diagnostics, surgery vet, dentist.`,
  professionalExperience: [
    'Winner of International Conferences.',
    'Chief physician of Equus veterinary clinic (1998-2001).',
    'Constantly attends workshops and congresses.',
    'Leading doctor at "UCCA" veterinary care since 2006.',
  ],
  location: {
    latitude: 34.052235,
    longitude: -118.243683,
    address: '141 N Union Ave, Los Angeles, CA',
  },
  image: profileImage,
  schedule: ["09:00", "09:30", "10:00", "10:30"],
  reviewsList: [
    {
      id: 1,
      user: 'Ann & Leo',
      date: '26.02.2019',
      comment: 'Great clinic! The dog was limping, prescribed quality treatment.',
      avatar: avatar1,
    },
    {
      id: 2,
      user: 'John Doe',
      date: '14.08.2021',
      comment: 'Very professional, handled my cat’s emergency very well.',
      avatar: avatar2,
    },
    {
      id: 3,
      user: 'Sarah L.',
      date: '02.07.2020',
      comment: 'Highly recommended for pet dental care.',
      avatar: avatar3,
    },
    {
      id: 4,
      user: 'Emily R.',
      date: '15.05.2022',
      comment: 'Best vet in the area, very caring and professional.',
      avatar: avatar4,
    },
    {
      id: 5,
      user: 'Michael B.',
      date: '10.09.2021',
      comment: 'Quick and efficient service!',
      avatar: avatar5,
    },
  ],
  nearbyVets: [
    {
      id: '1',
      name: 'Lauren Sell',
      specialty: 'Veterinary Dentist',
      experience: '7 years of experience',
      rating: 4.7,
      reviews: 23,
      price: "$20",
      distance: "1.5 km",
      image: "https://images.pexels.com/photos/4587996/pexels-photo-4587996.jpeg"
    },
    {
      id: '2',
      name: 'Daniel Carter',
      specialty: 'Veterinarian',
      experience: '5 years of experience',
      rating: 4.6,
      reviews: 30,
      price: "$18",
      distance: "2 km",
      image: "https://images.unsplash.com/photo-1528747008803-d2415c6e0bf8?w=1080&q=80"
    }
  ],
};
const handleWriteReview = () => {
  console.log("Navigate to Write Review Screen");
  // Ici, tu peux ajouter la navigation vers un écran d'ajout d'avis
};

const ProviderProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={ProviderProfileStyles.container}>
      <ScrollView 
  showsVerticalScrollIndicator={false} 
  contentContainerStyle={{ paddingBottom: 130 }} // Ajout d'un padding pour éviter le chevauchement
>

        <ProfileHeader
          name={providerData.name}
          specialty={providerData.specialty}
          rating={providerData.rating}
          reviews={providerData.reviews}
          price={providerData.price}
          distance={providerData.distance}
          image={providerData.image}
        />
        <HighlightedReview
  review={{
    comment: "He was friendly and diligent in getting to the right diagnosis and prescription.",
    totalReviews: providerData.reviews
  }}
  onPress={() => console.log('Navigate to all reviews')}
/>
        <Schedule schedule={providerData.schedule} />
        <MapSection location={providerData.location} name={providerData.name} />
        <Biography bio={providerData.biography} />
        <Experience experiences={providerData.professionalExperience} />
        <Reviews reviews={providerData.reviewsList} onWriteReview={handleWriteReview} />
        <NearbyVets vets={providerData.nearbyVets} />
       
      </ScrollView>
       {/* Bouton de réservation fixé en bas */}
       <View style={ProviderProfileStyles.fixedBookingContainer}>
        <BookingButton />
      </View>
    </View>
  );
};

export default ProviderProfileScreen;
