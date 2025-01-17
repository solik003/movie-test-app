# Backend Documentation

## Project Overview
This backend is designed to support a movie management application. It provides APIs for managing movies, filtering, and user interactions with favorite movies. Built with modern technologies, the backend ensures efficient data handling and robust functionality.

---

## Table of Contents
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)

---

## Technologies Used
- **Node.js**: Backend runtime environment
- **Express.js**: Web application framework
- **MongoDB**: Database for storing movie and user data
- **Mongoose**: ODM for MongoDB
- **dotenv**: Environment variable management

---

## Setup Instructions
### Prerequisites
- [Node.js](https://nodejs.org/): Ensure Node.js is installed (version >= 16.x).
- [MongoDB](https://www.mongodb.com/): Ensure MongoDB is installed or access to a MongoDB Atlas cluster.

### Steps
1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Application:**
   ```bash
   npm run dev
   ```
   The backend should now be running on `http://localhost:3000`.

---

## API Endpoints
### Movies
1. **Get All Movies**
   ```http
   GET /api/movies
   ```
   Fetches a list of all movies.

2. **Add a Movie**
   ```http
   POST /api/movies
   ```
   **Body:**
   ```json
   {
     "title": "string",
     "genre": ["string"],
     "rating": "number",
     "description": "string",
     "releaseDate": "YYYY-MM-DD",
     "director": "string",
     "actors": ["string"]
   }
   ```

3. **Update a Movie**
   ```http
   PUT /api/movies/:id
   ```

4. **Delete a Movie**
   ```http
   DELETE /api/movies/:id
   ```

---

## Environment Variables
- `PORT`: Port for the server to listen on (default: 5000)
- `MONGO_URI`: Connection string for MongoDB
- `JWT_SECRET`: Secret key for signing JWT tokens

---

## Folder Structure
```plaintext
backend/
├── models/            # Database schemas
├── routes/            # API route definitions
├── package.json       # Project metadata and dependencies
└── server.js          # Entry point of the backend
```

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contributors
Feel free to contribute by submitting pull requests or reporting issues!