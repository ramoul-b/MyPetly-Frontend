import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import BlogCommunityStyles from '../styles/BlogCommunityStyles';

 const blogArticles = [
    {
      id: '1',
      title: "Comment prendre soin d’un chiot ?",
      image: { uri: "https://images.unsplash.com/photo-1560807707-8cc77767d783" },
      date: "10 Février 2025",
    },
    {
      id: '2',
      title: "Les meilleures croquettes pour chiens en 2025",
      image: { uri: "https://images.pexels.com/photos/4587996/pexels-photo-4587996.jpeg" },
      date: "8 Février 2025",
    },
    {
      id: '3',
      title: "Pourquoi adopter un animal de refuge ?",
      image: { uri: "https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg" },
      date: "5 Février 2025",
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
  
  
  export { blogArticles, communityPosts };
  

const BlogCommunitySection = ({ navigation }) => {
  return (
    <View style={BlogCommunityStyles.container}>
      {/* Section Blog */}
      <View style={BlogCommunityStyles.header}>
        <Text style={BlogCommunityStyles.title}>Blog</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Blog')}>
          <Text style={BlogCommunityStyles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        horizontal
        data={blogArticles}
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
