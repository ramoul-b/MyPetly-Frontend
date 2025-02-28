import { StyleSheet } from 'react-native';

const ProviderProfileStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  
  /* Header - Profil du vétérinaire */
headerContainer: {
    position: 'relative',
    width: '100%',
    height: 500, 
    marginBottom:100,
  },
  
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    position: 'absolute',
    top: 50, // Gère le notch iOS
    left: 15,
    right: 15,
    zIndex: 10,
  },
  
  topBarIcons: {
    flexDirection: 'row',
    gap: 15, // Espacement entre les icônes
  },
  
  infoCard: {
    position: 'absolute',
    bottom: -70, // Fait dépasser légèrement la carte
    left: 15,
    right: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3, // Ombre pour effet flottant
  },
  
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  
  specialty: {
    fontSize: 16,
    color: '#666',
  },
  
  experience: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  
  priceRow: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  
/* Conteneur du badge + texte "reviews" */
ratingContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  right: 15,
  top: 20, // Positionne plus haut
},

/* Badge carré avec dégradé */
ratingBadge: {
  width: 60, // Carré
  height: 60, // Carré
  borderRadius: 18, // Coins légèrement arrondis
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 5, // Ombre pour effet de relief
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  marginBottom: 15, // Espace entre le badge et le texte "reviews"
},

/* Texte du rating */
ratingText: {
  fontSize: 28, // Plus grand
  fontWeight: 'bold', // En gras
  color: '#FFF',
  fontFamily:'Montserrat',
},

/* Texte des reviews sous le badge */
reviewsText: {
  fontSize: 12, // Plus petit
  color: '#333',
  textAlign: 'center',
},

/* Conteneur de l’avis mis en avant */
highlightedReviewContainer: {
  paddingHorizontal: 15,
  marginTop: 10,
},

/* Texte de l’avis */
reviewText: {
  fontSize: 16,
  fontStyle: 'italic',
  color: '#333',
  marginBottom: 5,
},

/* Ligne avec "a verified review" + icône */
reviewInfo: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,
},

verifiedText: {
  fontSize: 14,
  color: '#777',
  marginRight: 5,
},

/* Note en étoiles */
reviewStars: {
  flexDirection: 'row',
  marginBottom: 5,
},

/* Lien "View all reviews" */
viewAllReviewsText: {
  fontSize: 14,
  color: '#2563EB',
  fontWeight: 'bold',
  textAlign: 'right',
},


/* Conteneur du calendrier */
scheduleContainer: {
  backgroundColor: '#FFF',
  borderRadius: 15,
  padding: 15,
  marginHorizontal: 15,
  marginTop: 30,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
},

/* En-tête du calendrier */
scheduleHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 10,
},

scheduleMonth: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
},

/* Liste des jours */
daysList: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

dayItem: {
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 12,
  borderRadius: 10,
},

selectedDayItem: {
  backgroundColor: '#E8EAF6',
  borderRadius: 10,
},

dayNumber: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
},

dayLabel: {
  fontSize: 14,
  color: '#666',
},

activeIndicator: {
  width: 30,
  height: 4,
  backgroundColor: '#2563EB',
  borderRadius: 2,
  marginTop: 5,
},

/* Liste des créneaux horaires */
timeList: {
  marginTop: 10,
},

timeSlot: {
  backgroundColor: '#F0F0F0',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  marginRight: 10,
},

timeText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
},

/* Conteneur de la carte */
mapContainer: {
  backgroundColor: '#FFF',
  borderRadius: 15,
  padding: 15,
  marginHorizontal: 15,
  marginTop: 30,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
},

/* En-tête de la carte */
mapHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},

mapInfo: {
  marginLeft: 10,
},

mapTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
},

mapAddress: {
  fontSize: 14,
  color: '#666',
},

/* Carte interactive */
map: {
  height: 150,
  borderRadius: 10,
  overflow: 'hidden',
},



/* Biographie */
biographyContainer: { 
  paddingHorizontal: 20, 
  paddingTop: 30, 
  paddingBottom: 15, 
},

biographyTitle: { 
  fontSize: 20, 
  fontWeight: 'bold', 
  color: '#1D1D1D', 
  marginBottom: 8, 
},

biographyText: { 
  fontSize: 15, 
  lineHeight: 22, 
  color: '#555', 
},

/* Expérience */
experienceContainer: { 
  paddingHorizontal: 20, 
  paddingTop: 10, 
  paddingBottom: 15, 
},

experienceTitle: { 
  fontSize: 20, 
  fontWeight: 'bold', 
  color: '#1D1D1D', 
  marginBottom: 8, 
},

experienceItem: { 
  flexDirection: 'row', 
  alignItems: 'center', 
  marginBottom: 10, 
},

experienceText: { 
  fontSize: 15, 
  lineHeight: 22, 
  color: '#555', 
  marginLeft: 8,
},

/* Conteneur général */
reviewsContainer: { 
  paddingHorizontal: 20, 
  paddingTop: 30, 
  marginBottom: 30, 
},

/* Titre + Bouton "View all" */
reviewsHeader: { 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  marginBottom: 30, 
},

reviewsTitle: { 
  fontSize: 20, 
  fontWeight: 'bold', 
  color: '#1D1D1D', 
},

viewAll: { 
  fontSize: 14, 
  color: '#4A6CF7', 
  fontWeight: '600', 
},

/* Section générale des avis */
reviewsSectionContainer: { 
  paddingHorizontal: 20, 
  paddingTop: 30, 
},

/* En-tête avec titre + bouton "View all" */
reviewsSectionHeader: { 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  marginBottom: 15, 
},

reviewsSectionTitle: { 
  fontSize: 20, 
  fontWeight: 'bold', 
  color: '#1D1D1D', 
},

reviewsViewAll: { 
  fontSize: 14, 
  color: '#4A6CF7', 
  fontWeight: '600', 
},

/* Carte des avis */
reviewCard: { 
  width: 280, 
  backgroundColor: '#FFF', 
  borderRadius: 15, 
  padding: 20, 
  marginRight: 15, 
  shadowColor: "#000", 
  shadowOffset: { width: 0, height: 3 }, 
  shadowOpacity: 0.1, 
  shadowRadius: 4, 
  elevation: 3, 
  marginBottom: 30, 
  marginTop:10,
},

reviewCardHeader: { 
  flexDirection: 'row', 
  alignItems: 'center', 
  marginBottom: 0, 
},

reviewCardAvatar: { 
  width: 70, 
  height: 70, 
  borderRadius: 20, 
  marginRight: 10, 
  right: -3,
  top: -35, // Positionne plus haut

},

reviewCardUser: { 
  fontSize: 16, 
  fontWeight: 'bold', 
  color: '#1D1D1D', 
  right: -3,
  top: -25, // Positionne plus haut

},

reviewCardStars: { 
  flexDirection: 'row', 
  marginTop: 3, 
  right: -3,
  top: -25, // Positionne plus haut

},

reviewCardText: { 
  fontSize: 14, 
  color: '#555', 
  lineHeight: 20, 
  marginBottom: 0, 
  right: -3,
  top: -25, // Positionne plus haut

},

writeReviewButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F0F0F8',
  paddingVertical: 15,
  borderRadius: 10,
  marginHorizontal: 20,
  marginBottom: 10,
},

writeReviewText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#4552CB',
  marginLeft: 8,
},

/* Footer avec badge vérifié et date */
reviewCardFooter: { 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
},

reviewCardVerifiedBadge: { 
  flexDirection: 'row', 
  alignItems: 'center', 
},

reviewCardVerifiedText: { 
  fontSize: 12, 
  color: '#4CAF50', 
  marginLeft: 4, 
},

reviewCardDate: { 
  fontSize: 12, 
  color: '#A0A0A0', 
},


/* Conteneur général */
nearbyVetsContainer: { 
  paddingHorizontal: 20, 
  paddingTop: 30, 
},

/* Titre de la section */
nearbyVetsTitle: { 
  fontSize: 20, 
  fontWeight: 'bold', 
  color: '#1D1D1D', 
  marginBottom: 15, 
},

/* Carte vétérinaire */
vetCard: { 
  flexDirection: 'row', 
  backgroundColor: '#FFF', 
  borderRadius: 15, 
  padding: 15, 
  marginRight: 15, // Espacement entre les cartes
  marginBottom: 15, 
  alignItems: 'center',
  shadowColor: "#000", 
  shadowOffset: { width: 0, height: 2 }, 
  shadowOpacity: 0.1, 
  shadowRadius: 4, 
  elevation: 2, 
},

/* Image du vétérinaire */
vetImage: { 
  width: 70, 
  height: 70, 
  borderRadius: 15, 
  marginRight: 15, 
  resizeMode: 'cover', 
},

/* Détails texte */
vetDetails: {
  flex: 1,
},

vetName: { 
  fontSize: 16, 
  fontWeight: 'bold', 
  color: '#1D1D1D', 
  marginBottom: 2, 
},

vetSpecialty: { 
  fontSize: 14, 
  color: '#888', 
  marginBottom: 8, 
},

vetRatingRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,
},

vetStars: { 
  color: '#FFC107', 
  marginRight: 5, 
},

vetReviewCount: { 
  fontSize: 14, 
  color: '#A0A0A0', 
},

/* Informations complémentaires */
vetInfoRow: { 
  flexDirection: 'row', 
  alignItems: 'center', 
  justifyContent: 'space-between',
  width: '100%', 
  marginTop: 5, 
},

vetExperience: { 
  fontSize: 14, 
  fontWeight: 'bold', 
  color: '#333', 
},

vetDistance: { 
  flexDirection: 'row', 
  alignItems: 'center', 
},

vetPrice: { 
  flexDirection: 'row', 
  alignItems: 'center', 
},


fixedBookingContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#FFF',
  paddingVertical: 30,
  paddingHorizontal: 30,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: -2 },
  shadowRadius: 4,
  elevation: 5, 
  zIndex: 10, // Priorité d'affichage
},

bookingContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

bookingPrice: {
  fontSize: 16,
  color: '#333',
},

boldText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#000',
},

ratingContainerBooking: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 5,
},

reviewTextBooking: {
  fontSize: 14,
  color: '#A0A0A0',
  marginLeft: 5,
},

bookingButton: {
  backgroundColor: '#4A6CF7',
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderRadius: 25,
},

bookingButtonText: {
  color: '#FFF',
  fontSize: 16,
  fontWeight: 'bold',
},


});

export default ProviderProfileStyles;
