// Movie Model
const movieSchema = {
  title: String,
  description: String,
  genre: [String],
  director: String,
  cast: [String],
  duration: Number,
  releaseDate: Date,
  rating: Number,
  posterUrl: String,
  bannerUrl: String,
  createdAt: { type: Date, default: Date.now }
}

export default movieSchema
