import { useEffect, useState } from 'react';
import { getAllServices } from '../services/serviceService';

export default function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔁 Chargement des services...");
  
    getAllServices()
      .then((res) => {
        console.log("✅ Services reçus :", res);
        setServices(res);
      })
      .catch((err) => {
        console.error("❌ Erreur chargement services :", err);
        setServices([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  return { services, loading };
}
