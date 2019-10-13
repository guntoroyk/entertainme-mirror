const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TvShowSchema = new Schema({
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

const TvShow = mongoose.model('TvShow', TvShowSchema)

module.exports = TvShow
