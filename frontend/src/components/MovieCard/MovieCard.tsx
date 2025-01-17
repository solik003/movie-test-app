import React, { useMemo } from 'react';
import { Card, CardContent, Typography, CardMedia, Box, IconButton, Grid, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import { MovieCardProps } from '../../types/Movie';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/slices/favoritesSlice';
import { deleteMovieApi } from '../../api/movieApi';
import { selectFavoriteIds } from '../../redux/selectors/favoritesSelectors';
import { format } from 'date-fns';
import StarIcon from '@mui/icons-material/Star';

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onEdit, onDelete }) => {

  const dispatch = useDispatch();

  const favoriteIds = useSelector(selectFavoriteIds);

  const isFavorite = useMemo(() => (
    favoriteIds.includes(movie._id)
  ), [favoriteIds, movie._id]);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(movie._id));
  };

  const handleDelete = async () => {
    try {
      await deleteMovieApi(movie._id);
      onDelete(movie._id);
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <Card>
      <CardMedia component="img" height="200" image={movie.image} alt={movie.title} sx={{
        objectFit: 'cover',
      }} />
      <CardContent>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {movie.title}
          </Typography>
          <Typography variant="body2">
            {format(movie.releaseDate, 'yyyy')}
          </Typography>
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            {[...Array(5)].map((_, index) => (
              <IconButton
                key={index}
                sx={{ p: 0 }}
                disabled
              >
                <StarIcon color="warning" />
              </IconButton>
            ))}

            <Typography variant="body2" sx={{ ml: 1 }}>
              {movie.rating}/10
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
          <IconButton color="primary" onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <Link to={`/movie/${movie._id}`}>
            <IconButton color="primary">
              <SearchIcon />
            </IconButton>
          </Link>
          <IconButton color="secondary" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleFavoriteToggle}>
            {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
