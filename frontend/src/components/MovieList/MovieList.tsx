
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  addMovie,
  deleteMovie,
  setMovies,
  toggleFavorite,
  updateMovie,
} from "../../redux/slices/moviesSlice";
import {
  selectAllMovies,
  selectFavoriteMovies,
  selectSearchTerm,
} from "../../redux/selectors/movieSelectors";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import mongoose from "mongoose";

import { addMovieApi, fetchMovies, updateMovieApi } from "../../api/movieApi";

import { MovieCard } from "../MovieCard/MovieCard";
import { Navbar } from "../Navbar/Navbar";
import { MovieModal } from "../MovieModal/MovieModal";
import { Movie } from "../../types/Movie";

export const MovieList: React.FC = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);
  const [newMovie, setNewMovie] = useState<Movie>({
    _id: new mongoose.Types.ObjectId().toString(),
    title: "",
    rating: "",
    releaseDate: new Date(),
    description: "",
    actors: [],
    director: "",
    genre: [],
  });

  const dispatch = useDispatch();
  const movies = useSelector(selectAllMovies);
  const favoriteMovies = useSelector(selectFavoriteMovies);
  const searchTerm = useSelector(selectSearchTerm);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedMovies = await fetchMovies();
        dispatch(setMovies(fetchedMovies));
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };
    fetchData();
  }, [dispatch]);


  const filteredMovies = useMemo(() => {
    return movies.filter((movie: { title: string }) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);


  const handleFavoriteToggle = (id: string) => {
    dispatch(toggleFavorite(id));
  };


  const handleDeleteMovie = (id: string) => {
    dispatch(deleteMovie(id));
  };


  const handleAddMovie = async () => {
    if (newMovie.title && newMovie.rating && newMovie.releaseDate) {
      try {
        const createdMovie = await addMovieApi(newMovie);
        dispatch(addMovie(createdMovie));
        setOpenAddDialog(false);
        resetNewMovie();
      } catch (error) {
        alert("Failed to add the movie");
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };


  const handleUpdateMovie = async (updatedMovie: Movie) => {
    try {
      const updated = await updateMovieApi(updatedMovie);
      dispatch(updateMovie(updated));
      setOpenEditDialog(false);
    } catch (error) {
      alert("Failed to update the movie");
    }
  };


  const resetNewMovie = () => {
    setNewMovie({
      _id: new mongoose.Types.ObjectId().toString(),
      title: "",
      rating: "",
      releaseDate: new Date(),
      description: "",
      actors: [],
      director: "",
      genre: [],
    });
  };

  return (
    <Stack>
      <Navbar />
      <Box sx={{ m: 1 }}>
        <ImageList variant="masonry" cols={isSmallScreen ? 1 : 4} gap={8}>
          {filteredMovies.map((movie) => (
            <ImageListItem key={movie._id}>
              <MovieCard
                movie={movie}
                onEdit={() => {
                  setMovieToEdit(movie);
                  setOpenEditDialog(true);
                }}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={favoriteMovies.has(movie._id)}
                onDelete={handleDeleteMovie}
              />
            </ImageListItem>
          ))}
        </ImageList>

        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 4, width: isSmallScreen ? "100%" : "auto", }}
          onClick={() => setOpenAddDialog(true)}
        >
          Add New Movie
        </Button>

        <MovieModal
          open={openAddDialog || openEditDialog}
          onClose={() => {
            setOpenAddDialog(false);
            setOpenEditDialog(false);
            resetNewMovie();
          }}
          newMovie={openEditDialog ? movieToEdit! : newMovie}
          setNewMovie={setNewMovie}
          handleAddMovie={handleAddMovie}
          isEditMode={openEditDialog}
          handleUpdateMovie={handleUpdateMovie}
        />
      </Box>
    </Stack>
  );
};