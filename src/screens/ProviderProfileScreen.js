import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';

const provider = {
  id: 1,
  name: 'Aleksenko Vasily',
  specialty: 'Veterinary Dentist',
  experience: '10 years of experience',
  rating: 4.9,
  reviews: 125,
  price: '$20',
  distance: '1.5 km',
  clinic: 'Veterinary clinic "Alden-Vet"',
  address: '141 N Union Ave, Los Angeles, CA',
  biography: `Aleksenko Vasily Vasilyevich, born in 1974. Master of Veterinary Medicine. Leading doctor at "Alden-Vet".
  Specialization: clinical diagnostics, surgery vet, dentist.`,
  professionalExperience: [
    'Repeated participant and winner of the International Conferences.',
    'From 1998 to 2001, chief physician of Equus veterinary medicine clinic.',
    'Constantly increases the level of his qualifications.',
    'Since 2006, leading doctor at "UCCA" veterinary care.',
  ],
  personalInfo: 'Candidate master of sports in equestrian sport (dressage). Favorite dog breed: German Shepherd. Married with two children.',
  image: 'https://images.pexels.com/photos/3783479/pexels-photo-3783479.jpeg',
  reviewsList: [
    {
      id: 1,
      user: 'Ann & Leo',
      date: '26.02.2019',
      rating: 5,
      comment: 'Great clinic! The dog was limping, prescribed quality treatment. Excellent specialists!',
      image: 'https://images.pexels.com/photos/1452717/pexels-photo-1452717.jpeg',
    },
    {
      id: 2,
      user: 'John Doe',
      date: '14.08.2021',
      rating: 4.5,
      comment: 'Very professional, handled my cat’s emergency very well.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
  ],
  nearbyVets: [
    {
      id: 2,
      name: 'Lauren Sell',
      specialty: 'Veterinary Dentist',
      experience: '7 years of experience',
      rating: 4.6,
      price: '$20',
      distance: '1.5 km',
      image: 'https://images.pexels.com/photos/4578924/pexels-photo-4578924.jpeg',
    },
  ],
};

const ProviderProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppHeader title={provider.name} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image et info principale */}
        <Image source={{ uri: provider.image }} style={styles.profileImage} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{provider.name}</Text>
          <Text style={styles.specialty}>{provider.specialty}</Text>
          <View style={styles.row}>
            <Text style={styles.rating}>⭐ {provider.rating}</Text>
            <Text style={styles.reviews}>{provider.reviews} Reviews</Text>
          </View>
          <Text style={styles.experience}>{provider.experience}</Text>
          <View style={styles.row}>
            <Text style={styles.price}>{provider.price}</Text>
            <Text style={styles.distance}>📍 {provider.distance}</Text>
          </View>
        </View>

        {/* Biographie */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Biography</Text>
          <Text style={styles.text}>{provider.biography}</Text>
        </View>

        {/* Expérience professionnelle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {provider.professionalExperience.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Icon name="check-circle" size={18} color="#4CAF50" />
              <Text style={styles.text}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Avis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {provider.reviewsList.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <Image source={{ uri: review.image }} style={styles.reviewImage} />
              <View style={styles.reviewContent}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
                <Text style={styles.reviewText}>{review.comment}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Write a Review</Text>
          </TouchableOpacity>
        </View>

        {/* Vétérinaires à proximité */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Vets</Text>
          {provider.nearbyVets.map((vet) => (
            <View key={vet.id} style={styles.nearbyCard}>
              <Image source={{ uri: vet.image }} style={styles.nearbyImage} />
              <View style={styles.nearbyInfo}>
                <Text style={styles.name}>{vet.name}</Text>
                <Text style={styles.specialty}>{vet.specialty}</Text>
                <Text style={styles.rating}>⭐ {vet.rating}</Text>
                <Text style={styles.price}>{vet.price}</Text>
                <Text style={styles.distance}>📍 {vet.distance}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bouton de réservation */}
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  headerInfo: {
    padding: 15,
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    borderRadius: 10,
    marginTop: -30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 14,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  distance: {
    fontSize: 14,
    color: '#555',
  },
  section: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  reviewCard: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 10,
  },
  reviewImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  reviewContent: {
    marginLeft: 10,
  },
  reviewUser: {
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
  },
  reviewText: {
    fontSize: 14,
  },
  bookButton: {
    backgroundColor: '#5E72E4',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProviderProfileScreen;
