
import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addMovie, updateMovie } from "../../redux/slices/moviesSlice";
import { addMovieApi, updateMovieApi } from "../../api/movieApi";
import { AddMovieDialogProps } from "../../types/Movie";

export const MovieModal: React.FC<AddMovieDialogProps> = ({
  open,
  onClose,
  newMovie,
  isEditMode = false,
}) => {
  const dispatch = useDispatch();

  const defaultMovie = {
    title: "",
    rating: "",
    releaseDate: "",
    description: "",
    actors: "",
    director: "",
    genre: "",
    image: "",
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultMovie,
  });

  useEffect(() => {
    if (open) {
      const movie = isEditMode ? newMovie : defaultMovie;
      reset({
        ...movie,
        releaseDate: movie.releaseDate
          ? new Date(movie.releaseDate).getFullYear().toString()
          : "",
        actors: Array.isArray(movie.actors) ? movie.actors.join(", ") : movie.actors || "",
        genre: Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre || "",
      });
    }
  }, [open, isEditMode, newMovie]);

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      releaseDate: data.releaseDate ? new Date(`${data.releaseDate}-01-01`).toISOString() : "",
      actors: data.actors.split(",").map((actor: string) => actor.trim()),
      genre: data.genre.split(",").map((g: string) => g.trim()),
    };

    if (isEditMode) {
      updateMovieApi(formattedData);
      dispatch(updateMovie(formattedData));
    } else {
      addMovieApi(formattedData);
      dispatch(addMovie(formattedData));
    }

    onClose();
  };

  type MovieFieldNames = "title" | "rating" | "releaseDate" | "description" | "actors" | "director" | "genre" | "image";

  const fields: { name: MovieFieldNames; label: string; type: string; multiline?: boolean; rows?: number }[] = [
    { name: "title", label: "Title", type: "text" },
    { name: "rating", label: "Rating", type: "number" },
    { name: "releaseDate", label: "Release Year", type: "number" },
    {
      name: "description",
      label: "Description",
      type: "text",
      multiline: true,
      rows: 4,
    },
    { name: "actors", label: "Actors (comma-separated)", type: "text" },
    { name: "director", label: "Director", type: "text" },
    { name: "genre", label: "Genre (comma-separated)", type: "text" },
    { name: "image", label: "Image URL", type: "text" },
  ];
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditMode ? "Edit Movie" : "Add New Movie"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map(({ name, label, type, ...rest }) => {
            return (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field }) => (
                  <TextField
                    label={label}
                    variant="outlined"
                    fullWidth
                    type={type}
                    margin="normal"
                    {...field}
                    {...rest}
                  />
                )}
              />
            );
          })}
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              {isEditMode ? "Update Movie" : "Add Movie"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
