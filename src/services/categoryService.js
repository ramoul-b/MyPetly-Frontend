import apiClient from './apiClient';

export const getAllCategories = async () => {
  const response = await apiClient.get('/services');
  return response.data.data;
};
