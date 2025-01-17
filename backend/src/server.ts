import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import movieRoutes from './routes/movie';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


app.use('/api/movies', movieRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Express + TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
