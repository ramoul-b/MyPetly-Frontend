import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AppIcon from './AppIcon'; 

const FloatingButton = ({ icon, onPress }) => {
    return (
        <TouchableOpacity style={styles.fab} onPress={onPress}>
            <AppIcon name={icon} size={30} color="white" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 50,
        padding: 15,
        elevation: 5,
    },
});

export default FloatingButton;
