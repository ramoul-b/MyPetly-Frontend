import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileImagePicker = ({ image, onChange }) => {
  const handlePick = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });

      if (result && result.path) {
        onChange(result.path);
      }
    } catch (error) {
      console.log('Image picker cancelled or failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: image } : require('../../assets/imgs/avatar-placeholder.png')}
        style={styles.avatar}
      />
      <TouchableOpacity style={styles.plusIcon} onPress={handlePick}>
        <Icon name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#eee',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 0,
    right: '40%',
    backgroundColor: '#4A3AFF',
    borderRadius: 15,
    padding: 4,
  },
});

export default ProfileImagePicker;
