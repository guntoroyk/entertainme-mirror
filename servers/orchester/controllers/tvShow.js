const redis = require('redis')
const bluebird = require('bluebird')
const client = redis.createClient()
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const axios = require('axios')
const baseUrl = 'http://localhost:3001'

class TvShowController {

  static fetchTvShows = async (req, res, next) => {
    try {
      const TvShows = await client.getAsync('TvShows')
      // console.log(TvShows, 'dari redis')
      if (TvShows) {
        res.status(200).json(JSON.parse(TvShows))
      } else {
        const { data } = await axios.get(`${baseUrl}/TvShows`)
        await client.setAsync('TvShows', JSON.stringify(data), 'EX', 10) // delete tiap 10 detik
        res.status(200).json(data)
      }
      
    } catch (error) {
      next(error)
    }
  }

  static fetchTvShow = async (req, res, next) => {
    const { TvShowId } = req.params
    try {
      const TvShow = await client.getAsync('TvShow')

      if (TvShow) {
        res.status(200).json(JSON.parse(TvShow))
      } else {
        const { data } = await axios.get(`${baseUrl}/TvShows/${TvShowId}`)
        await client.setAsync('TvShow', JSON.stringify(data), 'EX', 10) 
        res.status(200).json(data)
      }

    } catch (error) {
      next(error)
    }
  }

  static addTvShow = async (req, res, next) => {
    const { title, overview, poster_path, backdrop_path, release_date, rating } = req.body

    try {
      const { data } = await axios.post(`${baseUrl}/TvShows`, {
        title, overview, poster_path, backdrop_path, release_date, rating
      })
      // console.log(data, 'berhasil!!!!')
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  static deleteTvShow = async (req, res, next) => {
    const { TvShowId } = req.params
    try {
      const { data } = await axios.delete(`${baseUrl}/TvShows/${TvShowId}`)
      res.status(200).json(data)
    } catch (error) {
      // console.log(error)
      next({status: error.response.data.status, message: error.response.data.message})
    }
  }
}

module.exports = TvShowController
