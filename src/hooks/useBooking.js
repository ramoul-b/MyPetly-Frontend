import { useState } from 'react';
import { createBooking } from '../services/bookingService';

export default function useBooking() {
  const [loading, setLoading] = useState(false);

  const book = async (data) => {
    setLoading(true);
    try {
      const res = await createBooking(data);
      return res;
    } finally {
      setLoading(false);
    }
  };

  return { book, loading };
}
