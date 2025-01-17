
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Chip, Box as MUIBox } from '@mui/material';
import { Movie } from '../types/Movie';
import { addMovieApi } from '../api/movieApi';

interface MovieFormProps {
  onMovieAdded: (newMovie: Movie) => void;
}

export const MovieForm: React.FC<MovieFormProps> = ({ onMovieAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [director, setDirector] = useState('');
  const [rating, setRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [image, setImage] = useState('');
  const [actors, setActors] = useState<string[]>([]);
  const [actor, setActor] = useState('');
  const [genre, setGenre] = useState<string[]>([]);
  const [newGenre, setNewGenre] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Omit<Movie, '_id'> = {
      title,
      description,
      actors,
      director,
      genre,
      rating,
      releaseDate: releaseDate ? new Date(releaseDate) : new Date(),
      image,
    };
    console.log(newMovie);

    try {
      const addedMovie = await addMovieApi(newMovie);
      onMovieAdded(addedMovie);
      setTitle('');
      setDescription('');
      setDirector('');
      setRating('');
      setReleaseDate('');
      setImage('');
      setActors([]);
      setGenre([]);
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleAddActor = () => {
    if (actor && !actors.includes(actor)) {
      setActors((prev) => [...prev, actor]);
      setActor('');
    }
  };

  const handleAddGenre = () => {
    if (newGenre && !genre.includes(newGenre)) {
      setGenre((prev) => [...prev, newGenre]);
      setNewGenre('');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Movie
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Director"
          fullWidth
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Rating"
          fullWidth
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          margin="normal"
          type="number"
          required
        />
        <TextField
          label="Release Date"
          fullWidth
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          margin="normal"
          type="date"
          required
        />
        <TextField
          label="Image URL"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
          margin="normal"
          required
        />

        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">Actors</Typography>
          <TextField
            label="Actor Name"
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddActor()}
            margin="normal"
            fullWidth
          />
          <MUIBox sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
            {actors.map((actor, index) => (
              <Chip
                key={index}
                label={actor}
                onDelete={() => setActors(actors.filter((a) => a !== actor))}
                sx={{ margin: 0.5 }}
              />
            ))}
          </MUIBox>
        </Box>


        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">Genres</Typography>
          <TextField
            label="Genre"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddGenre();
              }
            }}
            margin="normal"
            fullWidth
          />
          <MUIBox sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
            {genre.map((g, index) => (
              <Chip
                key={index}
                label={g}
                onDelete={() => setGenre(genre.filter((current) => current !== g))}
                sx={{ margin: 0.5 }}
              />
            ))}
          </MUIBox>
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Add Movie
        </Button>
      </form>
    </Box>
  );
};
