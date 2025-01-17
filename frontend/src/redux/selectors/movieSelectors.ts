
import { RootState } from '../store';

export const selectAllMovies = (state: RootState) => state.movies.movies;

export const selectFavoriteMovies = (state: RootState) => state.movies.favoriteMovies;

export const selectSearchTerm = (state: RootState) => state.movies.filters.searchTerm;

export const selectMovieFilters = (state: any) => state.movies.filters;