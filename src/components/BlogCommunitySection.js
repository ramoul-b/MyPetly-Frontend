import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import BlogCommunityStyles from '../assets/styles/BlogCommunityStyles';

const upcomingEvents = [
  {
    id: '1',
    title: "Atelier de dressage de chiots",
    image: { uri: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d" },
    date: "25 Avril 2025",
  },
  {
    id: '2',
    title: "Salon du bien‑être animal",
    image: { uri: "https://images.pexels.com/photos/28561954/pexels-photo-28561954/free-photo-of-close-up-of-a-relaxed-cream-british-shorthair-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    date: "1 Mai 2025",
  },
  {
    id: '3',
    title: "Journée Adoption en refuge",
    image: { uri: "https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    date: "15 Mai 2025",
  },
];

  
   const communityPosts = [
    {
      id: '1',
      user: "Badr Ramoul",
      avatar: { uri: "https://randomuser.me/api/portraits/men/1.jpg" },
      message: "Besoin de conseils sur l'éducation des chats 🐱",
      date: "Il y a 2h",
    },
    {
      id: '2',
      user: "Sarah L.",
      avatar: { uri: "https://randomuser.me/api/portraits/women/2.jpg" },
      message: "Quel est le meilleur vétérinaire sur Milan ?",
      date: "Il y a 5h",
    },
    {
      id: '3',
      user: "Jean P.",
      avatar: { uri: "https://randomuser.me/api/portraits/men/3.jpg" },
      message: "Mon chien refuse de manger, que faire ?",
      date: "Il y a 8h",
    },
  ];
  
  
  export { upcomingEvents, communityPosts };
  

const BlogCommunitySection = ({ navigation }) => {
  return (
    <View style={BlogCommunityStyles.container}>
      {/* Section Blog */}
      <View style={BlogCommunityStyles.header}>
        <Text style={BlogCommunityStyles.title}>Upcoming Events</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Blog')}>
          <Text style={BlogCommunityStyles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        horizontal
        data={upcomingEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={BlogCommunityStyles.articleCard} 
            onPress={() => navigation.navigate('ArticleDetail', { articleId: item.id })}
          >
            <Image source={item.image} style={BlogCommunityStyles.articleImage} />

            <Text style={BlogCommunityStyles.articleTitle}>{item.title}</Text>
            <Text style={BlogCommunityStyles.articleDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={BlogCommunityStyles.list}
        showsHorizontalScrollIndicator={false}
      />

      {/* Section Communauté */}
      <View style={BlogCommunityStyles.header}>
        <Text style={BlogCommunityStyles.title}>Communauté</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Community')}>
          <Text style={BlogCommunityStyles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={communityPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={BlogCommunityStyles.postCard} 
            onPress={() => navigation.navigate('CommunityPost', { postId: item.id })}
          >
            <Image source={item.avatar} style={BlogCommunityStyles.userAvatar} />
            <View style={BlogCommunityStyles.postInfo}>
              <Text style={BlogCommunityStyles.userName}>{item.user}</Text>
              <Text style={BlogCommunityStyles.postMessage}>{item.message}</Text>
              <Text style={BlogCommunityStyles.postDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={BlogCommunityStyles.list}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default BlogCommunitySection;
