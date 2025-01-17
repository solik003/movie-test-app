
import React, { useMemo, useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { MovieCard } from '../components/MovieCard/MovieCard';
import { removeFavorite } from '../redux/slices/favoritesSlice';
import { Movie } from '../types/Movie';
import { deleteMovie } from '../redux/slices/moviesSlice';
import { selectFavoriteIds } from '../redux/selectors/favoritesSelectors';
import { selectAllMovies } from '../redux/selectors/movieSelectors';
import { Link } from 'react-router-dom';

export const Favorites: React.FC = () => {
  const dispatch = useDispatch();

  const movies = useSelector(selectAllMovies);

  const favoriteIds = useSelector(selectFavoriteIds);

  const favoriteMovies = useMemo(() => {
    return movies.filter((movie: Movie) => favoriteIds.includes(movie._id));
  }, [movies, favoriteIds]);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);

  const handleDeleteMovie = (id: string) => {
    dispatch(deleteMovie(id));
  };

  const handleFavoriteToggle = (id: string) => {
    dispatch(removeFavorite(id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Favorite Movies
      </Typography>

      {favoriteMovies.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No favorite movies yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favoriteMovies.map((movie: Movie) => (
            <Grid item key={movie._id}>
              <MovieCard
                movie={movie}
                onEdit={() => {
                  setMovieToEdit(movie);
                  setOpenEditDialog(true);
                }}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={true}
                onDelete={handleDeleteMovie}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <Link to="/">
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            p: 2,
          }}
        >
          Back to Movies
        </Button>
      </Link>
    </Box>
  );
};