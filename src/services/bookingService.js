import apiClient from './apiClient';

export const createBooking = async (bookingData) => {
  const response = await apiClient.post('/bookings', bookingData);
  return response.data.data;
};
export const getMyAppointments = async () => {
  const response = await apiClient.get('/bookings/mine'); // adapter selon ton backend
  return response.data;
};