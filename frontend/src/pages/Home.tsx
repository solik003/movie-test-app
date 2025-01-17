import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { MovieList } from '../components/MovieList/MovieList';
import { fetchMovies } from '../api/movieApi';
import { Movie } from '../types/Movie';
import { Navbar } from '../components/Navbar/Navbar';

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Typography variant="h4" gutterBottom>
        Movie List
      </Typography>
      <MovieList />
    </>
  );
};
