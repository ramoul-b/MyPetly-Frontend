import api from './apiClient';      // ton axios configuré

export const createIntent = (amount) =>
  api.post('/payment-intent', { amount, currency: 'eur' })
     .then(r => r.data.client_secret);
