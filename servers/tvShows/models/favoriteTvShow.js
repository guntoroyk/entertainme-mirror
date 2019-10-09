const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favoriteTvShowSchema = new Schema({
  name: {
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
  first_air_date: {
    type: String,
  },
  vote_average: {
    type: Number,
  }, 
  user: {
    type: String, 
  }
})

const FavoriteTvShow = mongoose.model('FavoriteTvShow', favoriteTvShowSchema)

module.exports = FavoriteTvShow
