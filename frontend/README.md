# Frontend Documentation

## Project Overview
This frontend application is designed for managing movies, allowing users to browse, search, filter, and mark favorite movies. Built with React and modern tools, it provides an intuitive and responsive user interface.

---

## Table of Contents
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [Features](#features)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Technologies Used
- **React**: Frontend library for building UI components
- **TypeScript**: For type safety and better developer experience
- **Redux Toolkit**: State management
- **Material UI**: UI component library
- **Axios**: For API requests
- **React Router**: Navigation and routing

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/): Ensure Node.js is installed (version >= 16.x).
- A running instance of the backend server.

### Steps
1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   REACT_APP_API_URL=http://localhost:3000/
   ```

4. **Run the Application:**
   ```bash
   npm run dev
   ```
   The application should now be running on `http://localhost:5173`.

---

## Folder Structure
```plaintext
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── redux/            # Redux store setup
│   ├── hooks/            # Custom hooks
│   ├── config/           # Configuration files (BASE_URL)
│   ├── api/              # API requests
│   ├── types/            # TypeScript types
│   ├── theme/            # Custom theme (e.g., Material UI or Tailwind CSS)
│   └── App.tsx           # Main application component
├── public/               # Public assets (images)
├── package.json          # Project metadata and dependencies
└── tsconfig.json         # TypeScript configuration
```

## Features
- **Movie Listing**: Browse all movies.
- **Search and Filter**: Search movies by title, and filter by rating and genre.
- **Favorite Movies**: Mark and manage favorite movies.
- **Responsive Design**: Optimized for various screen sizes.
- **Dynamic Routing**: Navigate between pages seamlessly.

---

## Available Scripts

### `npm run dev`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## Environment Variables
- `REACT_APP_API_URL`: Base URL for the backend API.

---

## Contributing
Feel free to fork the repository, create a branch, and submit a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contributors
We welcome contributions! If you'd like to contribute, please submit an issue or pull request.

