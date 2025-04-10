// src/hooks/useAnimals.js

import { useState, useEffect, useCallback } from 'react';
import { animalService } from '../services/animalService';

export const useAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnimals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await animalService.getAnimals();
      setAnimals(data);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la récupération des animaux');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  const addAnimal = async (animalData) => {
    setLoading(true);
    setError(null);
    try {
      const newAnimal = await animalService.addAnimal(animalData);
      setAnimals((prevAnimals) => [...prevAnimals, newAnimal]);
      return newAnimal;
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de l\'ajout de l\'animal');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAnimal = async (id, animalData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedAnimal = await animalService.updateAnimal(id, animalData);
      setAnimals((prevAnimals) =>
        prevAnimals.map((animal) => (animal.id === id ? updatedAnimal : animal))
      );
      return updatedAnimal;
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la mise à jour de l\'animal');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAnimal = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await animalService.deleteAnimal(id);
      setAnimals((prevAnimals) => prevAnimals.filter((animal) => animal.id !== id));
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la suppression de l\'animal');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    animals,
    loading,
    error,
    fetchAnimals,
    addAnimal,
    updateAnimal,
    deleteAnimal,
  };
};

export const useAnimal = (id) => {
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnimal = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await animalService.getAnimal(id);
      setAnimal(data);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la récupération de l\'animal');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAnimal();
  }, [fetchAnimal]);

  const uploadImage = async (imageData) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const updatedAnimal = await animalService.uploadAnimalImage(id, imageData);
      setAnimal(updatedAnimal);
      return updatedAnimal;
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors du téléchargement de l\'image');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    animal,
    loading,
    error,
    fetchAnimal,
    uploadImage,
  };
};
