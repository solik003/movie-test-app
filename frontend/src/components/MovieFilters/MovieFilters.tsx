
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import {
  applyFilters,
  resetFilters,
  setGenreFilter,
  setRatingFilter,
  setSearchTerm,
} from '../../redux/slices/moviesSlice';
import { selectMovieFilters } from '../../redux/selectors/movieSelectors';

export const MovieFilters: React.FC<{ search: string; setSearch: React.Dispatch<React.SetStateAction<string>> }> = ({
  search,
  setSearch,
}) => {
  const dispatch = useDispatch();
  const { rating, genre } = useSelector(selectMovieFilters);

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRatingFilter(Number(e.target.value)));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genres = e.target.value.split(',').map((g) => g.trim());
    dispatch(setGenreFilter(genres));
  };

  const handleApplyFilters = () => {
    dispatch(applyFilters());
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    window.location.reload();
  };


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
    dispatch(setSearchTerm(newSearchTerm));
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: { xs: 'column', lg: 'row' },
        gap: 1.5,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: { xs: 1, sm: 2 },
      }}
    >
      <Box sx={{ flex: 1, minWidth: { xs: '100%', lg: 'auto' } }}>
        <TextField
          label="Search Movies"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          fullWidth
          placeholder="Search for a movie..."
          size="small"
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          gap: 1.5,
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          minWidth: { xs: '100%', lg: 'auto' },
        }}
      >
        <TextField
          label="Filter by Rating"
          variant="outlined"
          value={rating}
          onChange={handleRatingChange}
          type="number"
          color="primary"
          InputProps={{
            inputProps: { min: 1 },
          }}
          sx={{ flex: 1, minWidth: { xs: '100%', sm: 'auto' } }}
          size="small"
        />
        <TextField
          label="Filter by Genre"
          variant="outlined"
          value={genre.join(', ')}
          onChange={handleGenreChange}
          sx={{ flex: 1, minWidth: { xs: '100%', sm: 'auto' } }}
          size="small"
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          gap: 1.5,
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', lg: 'flex-end' },
          minWidth: { xs: '100%', lg: 'auto' },
        }}
      >
        <Button
          variant="contained"
          onClick={handleApplyFilters}
          sx={{ minWidth: { xs: '100%', sm: 'auto' }, p: 1.5 }}
          size="small"
        >
          Apply Filters
        </Button>
        <Button
          variant="outlined"
          onClick={handleResetFilters}
          sx={{ minWidth: { xs: '100%', sm: 'auto' }, p: 1.5 }}
          size="small"
        >
          Reset Filters
        </Button>
      </Box>
    </Box>
  );
};
