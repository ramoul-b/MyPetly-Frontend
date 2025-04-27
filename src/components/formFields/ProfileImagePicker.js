import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileImagePicker = ({ image, onImageSelected }) => {

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.7,
        mediaType: 'photo',
      });

      if (result && result.path) {
        onImageSelected(result.path);
      }
    } catch (error) {
      console.error('Erreur sélection image', error);
      alert('Erreur lors de la sélection de l\'image');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholder}>
            <Icon name="paw" size={40} color="#ccc" />
          </View>
        )}
        <View style={styles.plusIcon}>
          <Icon name="plus" size={20} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#eee' },
  placeholder: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  plusIcon: { position: 'absolute', bottom: 0, right: '40%', backgroundColor: '#4A3AFF', borderRadius: 15, padding: 4 },
});

export default ProfileImagePicker;
