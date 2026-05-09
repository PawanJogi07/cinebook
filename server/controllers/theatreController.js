// Theatre Controller
export const getTheatres = (req, res) => {
  // Get all theatres
  res.json({ message: 'Get theatres' })
}

export const getTheatreById = (req, res) => {
  // Get theatre by ID
  res.json({ message: 'Get theatre by ID' })
}

export const createTheatre = (req, res) => {
  // Create theatre (admin only)
  res.json({ message: 'Create theatre' })
}

export const updateTheatre = (req, res) => {
  // Update theatre (admin only)
  res.json({ message: 'Update theatre' })
}

export const deleteTheatre = (req, res) => {
  // Delete theatre (admin only)
  res.json({ message: 'Delete theatre' })
}
