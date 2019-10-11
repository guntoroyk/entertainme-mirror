const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
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
  release_date: {
    type: String,
  },
  rating: {
    type: Number,
  }
}, { timestamps: true })

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie
