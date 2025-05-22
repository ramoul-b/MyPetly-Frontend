import { useEffect, useState } from 'react';
import { getProvidersByService } from '../services/providerService';

export default function useProviders(serviceId) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProvidersByService(serviceId)
      .then(setProviders)
      .catch((err) => {
        console.error('❌ Erreur chargement providers :', err);
        setProviders([]);
      })
      .finally(() => setLoading(false));
  }, [serviceId]);

  return { providers, loading };
}
