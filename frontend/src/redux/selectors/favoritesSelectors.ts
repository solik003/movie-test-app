import { RootState } from '../store';

export const selectFavoriteIds = (state: RootState) => state.favorites.favoriteIds;

export const selectIsFavorite = (movieId: string) => (state: RootState) =>
    state.favorites.favoriteIds.includes(movieId);