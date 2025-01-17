
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieList } from './components/MovieList/MovieList';
import { MovieDetails } from './pages/MovieDetails';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Favorites } from './pages/Favorites';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>

      </Provider>
    </ThemeProvider>
  );
};

export default App;
