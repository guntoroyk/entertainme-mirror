const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favoriteMovieSchema = new Schema({
  title: {
    type: String,
  },
  overview: {
    type: String,
  },
  poster_path: {
    type: String,
  },
  backdrop_path: {
    type: String,
  },
  popularity: {
    type: String,
  }, 
  release_date: {
    type: String,
  },
  vote_average: {
    type: Number,
  }, 
  user: {
    type: String, 
  }
})

const FavoriteMovie = mongoose.model('FavoriteMovie', favoriteMovieSchema)

module.exports = FavoriteMovie
