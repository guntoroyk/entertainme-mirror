const axios = require('axios')
const TMDB_KEY = process.env.TMDB_KEY

module.exports = class MovieController {
  static fetchTvShows = async (req, res, next) => {
    // res.json('masuk fetch tv show')
    try {
      const { data } = await axios.get(`
      https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`)

      res.status(200).json(data.results)
    } catch (error) {
      next(error)
    }
  }

  static fetchTvShow = async (req, res, next) => {
    const { tvShowId } = req.params
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${TMDB_KEY}&language=en-US`)

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}