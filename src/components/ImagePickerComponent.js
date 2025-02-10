import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AppIcon from './AppIcon'; 

const ImagePickerComponent = ({ onImageSelected }) => {
    const [imageUri, setImageUri] = useState(null);

    const pickImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 500,
                maxHeight: 500,
                quality: 0.8,
            },
            (response) => {
                if (!response.didCancel && !response.error && response.assets.length > 0) {
                    const selectedImage = response.assets[0].uri;
                    setImageUri(selectedImage);
                    onImageSelected(selectedImage);
                }
            }
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                    <View style={styles.placeholder}>
                        <AppIcon name="camera" size={30} color="#666" />
                        <Text style={styles.text}>Ajouter une photo</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 15,
    },
    imagePicker: {
        width: 150,
        height: 150,
        backgroundColor: '#EAEAEA',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        alignItems: 'center',
    },
    text: {
        color: '#666',
        fontSize: 14,
        marginTop: 5,
    },
});

export default ImagePickerComponent;
