import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppHeader from '../components/AppHeader';

// 🔹 Données statiques pour les Stories
const stories = [
  { id: '1', name: 'Alice', avatar: 'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg' },
  { id: '2', name: 'Lara', avatar: 'https://img.freepik.com/free-photo/selfie-portrait-videocall_23-2149186124.jpg?t=st=1741117623~exp=1741121223~hmac=cfa95f1fd14cc1b4a9d18030386bfa1ec3dfc903fa7a50e61ce7a8be969af3bb&w=740' },
  { id: '3', name: 'Bob', avatar: 'https://img.freepik.com/free-photo/close-up-smiling-boy-with-sportswear-dawn_23-2147562116.jpg?t=st=1741117536~exp=1741121136~hmac=75651df1eb560ad68e0423aab57c1315b0fc0441ddc5c4496b40ac6e511eaf69&w=740' },
  { id: '4', name: 'Paula', avatar: 'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100263.jpg?t=st=1741117685~exp=1741121285~hmac=9029d5a41fdde591f98572babb67624f893547adfe3012e3067d7715ca170e90&w=740' },
  { id: '5', name: 'Charlie', avatar: 'https://img.freepik.com/free-photo/business-man-by-skyscraper_1303-13655.jpg?t=st=1741117725~exp=1741121325~hmac=243662c0abcda3bebe3a68713c96ce0b712a6c82a0e338345e4df8ea00d3c854&w=1060' },
  { id: '6', name: 'Emma', avatar: 'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100249.jpg?t=st=1741117781~exp=1741121381~hmac=3695c0843162b8f640bc3d34b95beecc5a88f8084cd85a6b65d0131e7e0da46b&w=740' },
  { id: '7', name: 'Anna', avatar: 'https://img.freepik.com/free-photo/close-up-blonde-model_23-2148323689.jpg?t=st=1741118109~exp=1741121709~hmac=3bf020fbc0e8d7e7184db2d16e6c3a3448c6fbc350622f295d8012a2b69b76b5&w=740' },
];

// 🔹 Données statiques pour les posts
const posts = [
  {
    id: '1',
    user: 'Alice',
    avatar: 'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg',
    image: 'https://img.freepik.com/free-photo/selective-focus-shot-adorable-brown-weimaraner-dog_181624-28923.jpg',
    text: 'Mon chien adore courir dans le parc ! 🐶💨',
    likes: 120,
    comments: 8,
  },
  {
    id: '2',
    user: 'Bob',
    avatar: 'https://img.freepik.com/free-photo/close-up-smiling-boy-with-sportswear-dawn_23-2147562116.jpg',
    image: 'https://img.freepik.com/free-photo/cute-small-striped-bengal-kitten-sitting-playing-with-blue-toy_181624-14353.jpg',
    text: 'Nouveau jouet pour mon chat 😻',
    likes: 85,
    comments: 4,
  },
  {
    id: '3',
    user: 'Lara',
    avatar: 'https://img.freepik.com/free-photo/selfie-portrait-videocall_23-2149186124.jpg',
    image: 'https://img.freepik.com/free-photo/young-woman-lying-park-with-her-dog_23-2147877741.jpg?t=st=1741118747~exp=1741122347~hmac=c8e52fb36c853cba4b92dfd42f821ca05b1b7492b5219e07109d2de1f2052203&w=1060',
    text: 'Moment de bonheur avec mon corgi 🐕💖',
    likes: 200,
    comments: 15,
  },
  {
    id: '4',
    user: 'Emma',
    avatar: 'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100249.jpg',
    image: 'https://img.freepik.com/free-photo/close-up-young-woman-playing-with-her-puppy_23-2148316322.jpg?t=st=1741118843~exp=1741122443~hmac=829a0b5ed1b0c96c009ed7689c8d34e3c35245646406177d7e40a128386f0eb2&w=900',
    text: 'Le sourire de mon chien illumine ma journée 😍☀️',
    likes: 190,
    comments: 10,
  },
  {
    id: '5',
    user: 'Charlie',
    avatar: 'https://img.freepik.com/free-photo/business-man-by-skyscraper_1303-13655.jpg',
    image: 'https://img.freepik.com/free-photo/full-shot-kid-exploring-nature-with-dog_23-2150489723.jpg?t=st=1741118941~exp=1741122541~hmac=a5f01f2ffd3a9403959edff9b4bd29d1b33b16dd3b73ed6f96651d65864be636&w=1060',
    text: 'Balade matinale avec mon fidèle compagnon 🏞️🐕',
    likes: 250,
    comments: 22,
  },
  {
    id: '6',
    user: 'Paula',
    avatar: 'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100263.jpg',
    image: 'https://img.freepik.com/free-photo/beautiful-cat-portrait-close-up_23-2149152060.jpg?t=st=1741119012~exp=1741122612~hmac=62d5d6b6a9515051cd7b707a5c13d204d2a9e065f01b3100ccb0722245607c38&w=1060',
    text: 'Mon chat a l’air tellement intelligent avec ses lunettes 📚😸',
    likes: 170,
    comments: 9,
  },
  {
    id: '7',
    user: 'Anna',
    avatar: 'https://img.freepik.com/free-photo/close-up-blonde-model_23-2148323689.jpg',
    image: 'https://img.freepik.com/free-photo/healthy-fresh-pet-food-ingredients-white-wooden-surface_1150-42117.jpg?t=st=1741119088~exp=1741122688~hmac=502b171574844f7efd0e259df3e87cb4e63cdf83963caff8623b45feaef1d983&w=1060',
    text: 'Recette healthy pour mon chien : viande & légumes 🥕🍗🐶',
    likes: 220,
    comments: 18,
  },
  {
    id: '8',
    user: 'Marco',
    avatar: 'https://img.freepik.com/free-photo/handsome-young-man-looking-camera-outdoor_23-2148222002.jpg',
    image: 'https://img.freepik.com/free-photo/portrait-two-identical-siamese-cats_158595-5728.jpg?t=st=1741119143~exp=1741122743~hmac=be75425e6f487b4e63730dc5bf35a4589bbf367caef41ee9b9cb845e8f7339f0&w=1060',
    text: 'Mes deux chats sont inséparables 🐱🐱💕',
    likes: 130,
    comments: 7,
  },
  {
    id: '9',
    user: 'Sophia',
    avatar: 'https://img.freepik.com/free-photo/stylish-woman-sunglasses-looking-camera_23-2148823489.jpg',
    image: 'https://img.freepik.com/free-photo/full-shot-woman-holding-dog_23-2149004548.jpg?t=st=1741119209~exp=1741122809~hmac=e7c1f0bbceb8541f3f30e28ef995a289745578574f80f1ad8c5534d6e32381c8&w=1060',
    text: 'Voyage en voiture avec mon chien 🚗🐶🌍',
    likes: 275,
    comments: 30,
  },
  {
    id: '10',
    user: 'Ethan',
    avatar: 'https://img.freepik.com/free-photo/man-with-glasses-smiling-camera_23-2148823485.jpg',
    image: 'https://img.freepik.com/free-photo/cute-labrador-puppy-playing-toy_181624-23873.jpghttps://img.freepik.com/free-photo/close-up-beautiful-dachshund-dog-with-chewing-toy_23-2149202486.jpg?t=st=1741119286~exp=1741122886~hmac=851ab8bf25e9762bba08a75e868764e912451cb97ad73f5591e4bb7a90b4884a&w=1060',
    text: 'Nouveau jouet pour mon labrador 🦴🐕',
    likes: 300,
    comments: 35,
  }
];

const CommunityScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      {/* ✅ Header Global */}
      <AppHeader title="Communauté" navigation={navigation} />

      {/* ✅ Barre de Recherche */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher des posts ou utilisateurs..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ✅ Stories */}
        <FlatList
          horizontal
          data={stories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.story}>
              <Image source={{ uri: item.avatar }} style={styles.storyImage} />
              <Text style={styles.storyText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />

        {/* ✅ Liste des Posts */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              {/* HEADER POST */}
              <View style={styles.postHeader}>
                <Image source={{ uri: item.avatar }} style={styles.postAvatar} />
                <Text style={styles.postUser}>{item.user}</Text>
              </View>
              {/* IMAGE DU POST */}
              <Image source={{ uri: item.image }} style={styles.postImage} />
              {/* TEXTE */}
              <Text style={styles.postText}>{item.text}</Text>
              {/* ACTIONS */}
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="heart-outline" size={20} color="#F00" />
                  <Text>{item.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="chatbubble-outline" size={20} color="#888" />
                  <Text>{item.comments}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={styles.postList}
        />
      </ScrollView>

      {/* ✅ Bouton Flottant "Ajouter un Post" */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => console.log('Créer un post')}>
        <Icon name="add-circle" size={50} color="#5E72E4" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  story: {
    alignItems: 'center',
    margin: 10,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#5E72E4',
  },
  storyText: {
    fontSize: 12,
    marginTop: 5,
  },
  postList: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  postCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  postText: {
    marginTop: 5,
    fontSize: 14,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default CommunityScreen;
