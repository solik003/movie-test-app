import mongoose, { Schema, Document } from 'mongoose';

interface IMovie extends Document {
  title: string;
  description: string;
  actors: string[];
  director: string;
  genre: string[];
  rating: number;
  releaseDate: Date;
  image: string
}

const movieSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    actors: {
      type: [String],
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    image: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model<IMovie>('Movie', movieSchema);

export default Movie;
