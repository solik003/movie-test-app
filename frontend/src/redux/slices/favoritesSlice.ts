import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favoriteIds: string[];
}

const initialState: FavoritesState = {
  favoriteIds: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {

    addFavorite(state, action: PayloadAction<string>) {
      const movieId = action.payload;
      if (!state.favoriteIds.includes(movieId)) {
        state.favoriteIds.push(movieId);
      }
    },

    removeFavorite(state, action: PayloadAction<string>) {
      const movieId = action.payload;
      state.favoriteIds = state.favoriteIds.filter((id) => id !== movieId);
    },

    toggleFavorite(state, action: PayloadAction<string>) {
      const movieId = action.payload;
      if (state.favoriteIds.includes(movieId)) {
        state.favoriteIds = state.favoriteIds.filter((id) => id !== movieId);
      } else {
        state.favoriteIds.push(movieId);
      }
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
