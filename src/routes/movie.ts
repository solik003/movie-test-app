import express, { Request, Response } from 'express';
import Movie from '../models/Movie';
import mongoose from 'mongoose';

const router = express.Router();

// Create
router.post('/', async (req: Request, res: Response) => {
    try {
      const movie = new Movie(req.body);
      const savedMovie = await movie.save();
      res.status(201).json(savedMovie);
    } catch (error: any) {
      console.error('Error saving movie:', error);
      res.status(500).json({ error: error.message });
    }
});

// Get all movies
router.get('/', async (req: Request, res: Response) => {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch (err: any) {
      console.error('Error fetching movies:', err);
      res.status(500).json({ message: 'Error fetching movies', error: err.message });
    }
});

// Get a movie 
router.get('/find/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error: any) {
        console.error('Error fetching movie by ID:', error);
        res.status(500).json({ error: error.message });
    }
});


  
// Update
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.status(200).json(updatedMovie);
    } catch (error: any) {
      console.error('Error updating movie:', error);
      res.status(500).json({ error: error.message });
    }
});
  
  // Delete
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const deletedMovie = await Movie.findByIdAndDelete(id);
  
      if (!deletedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.status(200).json({ message: 'Movie deleted successfully', movie: deletedMovie });
    } catch (error: any) {
      console.error('Error deleting movie:', error);
      res.status(500).json({ error: error.message });
    }
});

export default router;
