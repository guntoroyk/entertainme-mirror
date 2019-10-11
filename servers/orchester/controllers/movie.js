const redis = require('redis')
const bluebird = require('bluebird')
const client = redis.createClient()
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const axios = require('axios')
const baseUrl = 'http://localhost:3001'

class MovieController {

  static fetchMovies = async (req, res, next) => {
    try {
      const movies = await client.getAsync('movies')
      // console.log(movies, 'dari redis')
      if (movies) {
        res.status(200).json(JSON.parse(movies))
      } else {
        const { data } = await axios.get(`${baseUrl}/movies`)
        await client.setAsync('movies', JSON.stringify(data), 'EX', 10) // delete tiap 10 detik
        res.status(200).json(data)
      }
      
    } catch (error) {
      next(error)
    }
  }

  static fetchMovie = async (req, res, next) => {
    const { movieId } = req.params
    try {
      const movie = await client.getAsync('movie')

      if (movie) {
        res.status(200).json(JSON.parse(movie))
      } else {
        const { data } = await axios.get(`${baseUrl}/movies/${movieId}`)
        await client.setAsync('movie', JSON.stringify(data), 'EX', 10) 
        res.status(200).json(data)
      }

    } catch (error) {
      next(error)
    }
  }

  static addMovie = async (req, res, next) => {
    const { title, overview, poster_path, backdrop_path, release_date, rating } = req.body

    try {
      const { data } = await axios.post(`${baseUrl}/movies`, {
        title, overview, poster_path, backdrop_path, release_date, rating
      })
      // console.log(data, 'berhasil!!!!')
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  static deleteMovie = async (req, res, next) => {
    const { movieId } = req.params
    try {
      const { data } = await axios.delete(`${baseUrl}/movies/${movieId}`)
      res.status(200).json(data)
    } catch (error) {
      // console.log(error)
      next({status: error.response.data.status, message: error.response.data.message})
    }
  }
}

module.exports = MovieController
