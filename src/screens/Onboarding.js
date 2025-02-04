import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import SwipeableViews from 'react-native-swipeable-views';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get("screen");

// Données des slides d'onboarding
const slides = [
  {
    key: "1",
    title: "Welcome to MyPetly",
    description: "Manage your pets easily and stay organized!",
    image: require('../assets/imgs/onboarding1.png'),
  },
  {
    key: "2",
    title: "Find Best Services",
    description: "Discover top-rated pet care services around you.",
    image: require('../assets/imgs/onboarding2.png'),
  },
  {
    key: "3",
    title: "Get Started Now!",
    description: "Create an account and enjoy premium features.",
    image: require('../assets/imgs/onboarding3.png'),
  }
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <SwipeableViews
        index={index}
        onChangeIndex={setIndex}
        enableMouseEvents
        containerStyle={styles.swipeContainer}
      >
        {slides.map((slide, i) => (
          <View key={slide.key} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>

            {/* Navigation vers Login/Register */}
            {i === slides.length - 1 && (
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => navigation.replace('Login')}
              >
                <Text style={styles.startButtonText}>Get Started</Text>
                <Icon name="arrow-forward-outline" size={20} color="white" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </SwipeableViews>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  swipeContainer: {
    height: height
  },
  slide: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  image: {
    width: width * 0.8,
    height: height * 0.5,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginTop: 10
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#5E72E4',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 30,
    alignItems: 'center'
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10
  }
});
