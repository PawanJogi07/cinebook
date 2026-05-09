// Movie Controller
export const getMovies = (req, res) => {
  // Get all movies
  res.json({ message: 'Get all movies' })
}

export const getMovieById = (req, res) => {
  // Get movie by ID
  res.json({ message: 'Get movie by ID' })
}

export const createMovie = (req, res) => {
  // Create new movie (admin only)
  res.json({ message: 'Create movie endpoint' })
}

export const updateMovie = (req, res) => {
  // Update movie (admin only)
  res.json({ message: 'Update movie endpoint' })
}

export const deleteMovie = (req, res) => {
  // Delete movie (admin only)
  res.json({ message: 'Delete movie endpoint' })
}
