
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types/Movie';

interface MovieState {
  movies: Movie[];
  favoriteMovies: Set<string>;
  favoriteCount: number;
  filters: {
    rating: number;
    genre: string[];
    searchTerm: string;
  };
}

const initialState: MovieState = {
  movies: [],
  favoriteMovies: new Set(),
  favoriteCount: 0,
  filters: {
    rating: 0,
    genre: [],
    searchTerm: '',
  },
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
    addMovie(state, action: PayloadAction<Movie>) {
      state.movies.push(action.payload);
    },
    deleteMovie(state, action: PayloadAction<string>) {
      state.movies = state.movies.filter((movie) => movie._id !== action.payload);
    },

    addFavorite(state, action: PayloadAction<string>) {
      const movieId = action.payload;
      const movie = state.movies.find((m) => m._id === movieId);
      if (movie && !state.favoriteMovies.has(movieId)) {
        state.favoriteMovies.add(movieId);

        state.favoriteCount += 1;

        movie.isFavorite = true;
        console.log("Favorite added:", movieId, "Current count:", state.favoriteCount);
      }
    },

    removeFavorite(state, action: PayloadAction<string>) {
      const movieId = action.payload;

      const movie = state.movies.find((m) => m._id === movieId);

      if (movie && state.favoriteMovies.has(movieId)) {
        state.favoriteMovies.delete(movieId);

        state.favoriteCount -= 1;

        movie.isFavorite = false;
      }
    },

    toggleFavorite: (state, action: PayloadAction<string>) => {
      const movie = state.movies.find(movie => movie._id === action.payload);
      if (movie) {
        movie.isFavorite = !movie.isFavorite;
      }
    },

    updateMovie(state, action: PayloadAction<Movie>) {
      const index = state.movies.findIndex(movie => movie._id === action.payload._id);
      if (index !== -1) {
        state.movies[index] = action.payload;
      }
    },
    setRatingFilter: (state, action: PayloadAction<number>) => {
      state.filters.rating = action.payload;
    },

    setGenreFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.genre = action.payload;
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
    },

    resetFilters: (state) => {
      state.filters = { rating: 0, genre: [], searchTerm: '' };
    },

    applyFilters: (state) => {
      let filteredMovies = state.movies;

      if (state.filters.rating > 0) {
        filteredMovies = filteredMovies.filter(
          (movie) => Number(movie.rating) === state.filters.rating
        );
      }

      if (state.filters.genre.length > 0) {
        filteredMovies = filteredMovies.filter((movie) =>
          state.filters.genre.some((genre) => movie.genre?.includes(genre))
        );
      }

      if (state.filters.searchTerm) {
        filteredMovies = filteredMovies.filter((movie) =>
          movie.title.toLowerCase().includes(state.filters.searchTerm.toLowerCase())
        );
      }

      state.movies = filteredMovies;
    },

  },
});

export const { setMovies, addMovie, deleteMovie, toggleFavorite, updateMovie, removeFavorite, setRatingFilter, setGenreFilter, setSearchTerm, resetFilters, applyFilters } = movieSlice.actions;

export default movieSlice.reducer;