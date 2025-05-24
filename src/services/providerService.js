import apiClient from './apiClient';

export const getProvidersByService = async (serviceId) => {
  const response = await apiClient.get(`/provider-services/by-service/${serviceId}`, {
  });
  return response.data;
};



export const getProviderById = async (id) => {
  console.log('📤 Requête vers API :', `/providers/${id}`);
  try {
    const response = await apiClient.get(`/providers/${id}`);
    console.log('✅ Réponse reçue :', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erreur API getProviderById :', error.response?.data || error.message);
    throw error;
  }
};

