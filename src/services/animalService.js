// src/services/animalService.js

import apiClient from './apiClient';

const ANIMAL_ENDPOINT = '/animals';

export const animalService = {
  // Récupérer tous les animaux de l'utilisateur
  getAnimals: async () => {
    try {
      const response = await apiClient.get(ANIMAL_ENDPOINT);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Récupérer un animal spécifique
  getAnimal: async (id) => {
    try {
      const response = await apiClient.get(`${ANIMAL_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Ajouter un nouvel animal
  addAnimal: async (animalData) => {
    try {
      const response = await apiClient.post(ANIMAL_ENDPOINT, animalData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Mettre à jour un animal existant
  updateAnimal: async (id, animalData) => {
    try {
      const response = await apiClient.put(`${ANIMAL_ENDPOINT}/${id}`, animalData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Supprimer un animal
  deleteAnimal: async (id) => {
    try {
      const response = await apiClient.delete(`${ANIMAL_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Télécharger une image pour un animal
  uploadAnimalImage: async (id, imageData) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageData.uri,
        type: imageData.type || 'image/jpeg',
        name: imageData.fileName || 'animal_image.jpg',
      });

      const response = await apiClient.post(`${ANIMAL_ENDPOINT}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
