import React, { useState } from 'react';
import { IconButton, Badge, Box, Stack } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectFavoriteIds } from '../../redux/selectors/favoritesSelectors';
import { MovieFilters } from '../MovieFilters/MovieFilters';

export const Navbar: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const favoriteIds = useSelector(selectFavoriteIds);
  const favoritesCount = favoriteIds.length;

  const navigate = useNavigate();

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

    return (
        <Box
          sx={{
            p: 2,
            top: 2,
            zIndex: 1000,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Stack spacing={2} alignItems="center" direction={{ xs: 'column', sm: 'row' }}  >
              <MovieFilters search={search} setSearch={setSearch} />
              <IconButton onClick={handleFavoritesClick} color='primary'>
                <Badge badgeContent={favoritesCount} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </Stack>

          </Stack>
        </Box>
      );
};