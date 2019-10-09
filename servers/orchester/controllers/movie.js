const baseUrl = 'http://localhost:3001'
const axios = require('axios')

class MovieController {

  static fetchMovies = async (req, res, next) => {
    try {
      const { data } = await axios.get(`${baseUrl}/movies`)

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static fetchMovie = async (req, res, next) => {
    const { movieId } = req.params
    try {
      const { data } = await axios.get(`${baseUrl}/movies/${movieId}`)

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static fetchFavoriteMovies = async (req, res, next) => {
    const { user } = req.params
    try {
      const { data } = await axios.get(`${baseUrl}/favorites/${user}`)
      res.status(status).json(data)
    } catch (error) {
      next(error)
    }
  }

  static fetchFavoriteMovie = async (req, res, next) => {
    const { user, movieId } = req.params
    try {
      const { data } = await axios.get(`${baseUrl}/favorites/${user}/${movieId}`)
      res.status(status).json(data)
    } catch (error) {
      next(error)
    }
  }

  static addFavorite = async (req, res, next) => {
    const { user, movieId } = req.params
    try {
      const { data } = await axios.get(`${baseUrl}/movies/${movieId}`)
      const response = await axios.post(`${baseUrl}/favorites/${user}`, {
        title: data.title, 
        overview: data.overview, 
        poster_path: data.poster_path, 
        backdrop_path: data.backdrop_path, 
        release_data: data.release_data,
        vote_average: data.vote_average
      })
      res.status(201).json(response)
    } catch (error) {
      next(error)
    }
  }

  static deleteFavorite = async (req, res, next) => {
    const { user, movieId } = req.params
    try {
      const { data } = axios.delete(`${baseUrl}/favorites/${user}/${movieId}`)
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

}

module.exports = MovieController
