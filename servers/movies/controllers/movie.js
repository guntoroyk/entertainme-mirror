const axios = require('axios')
const TMDB_KEY = process.env.TMDB_KEY

module.exports = class MovieController {
  static fetchMovies = async (req, res, next) => {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)

      res.status(200).json(data.results)
    } catch (error) {
      next(error)
    }
  }

  static fetchMovie = async (req, res, next) => {
    const { movieId } = req.params
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_KEY}&language=en-US`)

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}