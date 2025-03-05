import React, { useEffect, useState } from 'react';
import { View, Image,Text } from 'react-native';
import { Header } from 'react-native-elements';
import NotificationMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const AppHeader = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Header
      leftComponent={
        user?.photo_url ? (
          <Image
            source={{ uri: user.photo_url }}
            style={{
              width: 35, 
              height: 35,
              borderRadius: 17.5,  // Image ronde
              marginLeft: 10,
            }}
          />
        ) : null
      }
      centerComponent={{ 
  text: <Text>{user ? t('home.title', { name: user.name }) : t('home.title', { name: '...' })}</Text>, 
  style: { color: '#fff', fontSize: 18 }
}}

      rightComponent={
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <NotificationMenu />
          <ProfileMenu />
        </View>
      }
      containerStyle={{ backgroundColor: '#5E72E4' }}
    />
  );
};

export default AppHeader;
