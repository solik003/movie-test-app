import { BASE_URL } from '../config/apiConfig';
import { Movie } from '../types/Movie';

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/movies`);
    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.statusText}`);
    }
    const data: Movie[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return [];
  }
};

export const addMovieApi = async (newMovie: Omit<Movie, "_id">): Promise<Movie> => {
    try {
      const response = await fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      });
      
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to add the movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      throw error;
    }
};

export const updateMovieApi = async (updatedMovie: Movie) => {
    try {
      const response = await fetch(`${BASE_URL}/movies/${updatedMovie._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
      });
      
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to update the movie');
      }
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
};

export const deleteMovieApi = async (movieId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/movies/${movieId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the movie');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw error;
    }
};