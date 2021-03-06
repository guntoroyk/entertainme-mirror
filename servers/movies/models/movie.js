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
    type: Object,
  },
  backdrop_path: {
    type: Object,
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
