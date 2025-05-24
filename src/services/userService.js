import apiClient from './apiClient';

export const userService = {
  getProfile: async () => {
    const { data } = await apiClient.get('/account/profile');
    return data;
  },

  updateProfile: async (payload) => {
    const { data } = await apiClient.put('/account/update-profile', payload);
    return data;
  }
};
