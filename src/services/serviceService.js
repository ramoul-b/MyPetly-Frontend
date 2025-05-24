import apiClient from './apiClient';

export const getAllServices = async () => {
  const response = await apiClient.get('/services');
  console.log("📦 Réponse brute API :", response);
  return response.data || [];

};
