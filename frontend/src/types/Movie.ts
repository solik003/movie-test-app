export interface Movie {
  _id: string;
  title: string;
  description?: string;
  actors?: string[];
  director?: string;
  genre?: string[];
  rating: string;
  releaseDate: Date;
  image?: string;
  isFavorite?: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  onEdit: () => void;
  onFavoriteToggle: (id: string) => void;
  isFavorite: boolean;
  onDelete: (id: string) => void;
}

export interface AddMovieDialogProps {
  open: boolean;
  onClose: () => void;
  newMovie: Movie;
  setNewMovie: React.Dispatch<React.SetStateAction<Movie>>;
  handleAddMovie: () => void;
  isEditMode: boolean;
  handleUpdateMovie: (updatedMovie: Movie) => void;
}

export interface EditMovieDialogProps {
  open: boolean;
  onClose: () => void;
  movieToEdit: Movie | null;
  fieldsToUpdate: {
    title: boolean;
    rating: boolean;
    releaseDate: boolean;
  };
  setFieldsToUpdate: React.Dispatch<React.SetStateAction<{ title: boolean; rating: boolean; releaseDate: boolean }>>;
  handleUpdateMovie: (updatedMovie: Movie) => void;
  setMovieToEdit: React.Dispatch<React.SetStateAction<Movie | null>>;
}