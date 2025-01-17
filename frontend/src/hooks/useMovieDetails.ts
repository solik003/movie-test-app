import { useState, useEffect } from 'react';
import { BASE_URL } from '../config/apiConfig';

export const useMovieDetails = (id: string | undefined) => {
  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/movies/find/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMovie(data);
        } else {
          setError('Failed to fetch movie details');
        }
      } catch (err) {
        setError('An error occurred while fetching movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return { movie, loading, error };
};
