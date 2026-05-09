// Authentication Middleware
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  
  try {
    // Verify token logic here
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// Admin Middleware
export const adminMiddleware = (req, res, next) => {
  // Check if user is admin
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
}
