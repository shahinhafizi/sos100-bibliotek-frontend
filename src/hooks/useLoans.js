import { useEffect, useMemo, useState } from 'react';
import { formatApiError, getLoans } from '../services/api';

export function useLoans() {
  // Data + loading + error samlat i en hook
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hämta vid första render
    let isMounted = true;
    setLoading(true);
    setError(null);

    getLoans()
      .then((data) => {
        if (!isMounted) return;
        setLoans(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(formatApiError(err));
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return useMemo(
    () => ({
      loans,
      loading,
      error,
      refetch: async () => {
        // Manuell uppdatering (knapp i UI)
        setLoading(true);
        setError(null);
        try {
          const data = await getLoans();
          setLoans(Array.isArray(data) ? data : []);
        } catch (err) {
          setError(formatApiError(err));
        } finally {
          setLoading(false);
        }
      },
    }),
    [loans, loading, error]
  );
}

