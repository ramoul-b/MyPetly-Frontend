import { useState, useEffect } from 'react';
import { getProviderById } from '../services/providerService';

export default function useProvider(id) {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProviderById(id)
      .then(setProvider)
      .catch(err => {
        console.error("❌ Erreur chargement provider :", err);
        setProvider(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { provider, loading };
}
