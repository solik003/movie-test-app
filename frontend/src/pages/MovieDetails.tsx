
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Typography, Button, Chip, Grid } from '@mui/material';
import { useMovieDetails } from '../hooks/useMovieDetails';

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const { movie, loading, error } = useMovieDetails(id);

  if (loading) {
    return <Typography variant="h6" sx={{ textAlign: 'center'}}>Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" sx={{ textAlign: 'center'}}>Error: {error}</Typography>;
  }

  if (!movie) {
    return <Typography variant="h6" sx={{ textAlign: 'center'}}>Movie not found</Typography>;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        padding: 0,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      }}
    >
      <Box
        component="img"
        src={movie.image}
        alt={movie.title}
        sx={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
  
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        }}
      />
  
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: 3,
          color: 'common.white',
          maxWidth: '1200px',
        }}
      >
        <Typography variant="h2" sx={{
          fontWeight: 'bold',
          mb: 2,
          letterSpacing: 1.5,
        }}>
          {movie.title}
        </Typography>
  
        <Typography variant="h5" sx={{
          mb: 3,
          fontStyle: 'italic',
        }}>
          Directed by: {movie.director}
        </Typography>
  
        <Typography variant="body1" sx={{
          lineHeight: 1.7,
          mb: 3,
          textAlign: 'justify',
          maxWidth: '800px',
          ml: 'auto',
          mr: 'auto',
        }}>
          {movie.description}
        </Typography>
        
        <Grid container spacing={1} sx={{
          mt: 2,
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 1,
          mb: 3,
        }}>
          {movie.genre?.map((genre: any, index: any) => (
            <Grid item key={index}>
              <Chip
                label={genre}
                color="primary"
                variant="filled"
                size="small"
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" sx={{
          mb: 3,
        }}>
          Actors: {movie.actors?.join(', ')}
        </Typography>

        <Typography variant="body2" sx={{
          mb: 3,
        }}>
          Rating: {movie.rating}/10
        </Typography>

        <Link to="/">
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              padding: '0.75rem 2rem',
            }}
          >
            Back to Movies
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
