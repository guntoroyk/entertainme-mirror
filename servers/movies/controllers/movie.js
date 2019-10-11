const Movie = require('../models/movie')

module.exports = class MovieController {
  static fetchMovies = async (req, res, next) => {
    // const { user } = req.params
    try {
      const response = await Movie.find({ })
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  static fetchMovie = async (req, res, next) => {
    const { movieId } = req.params
    // console.log(req.params)
    try {
      const response = await Movie.findOne({_id: movieId})
      res.status(200).json(response)
      // console.log(response, 'moviee')
    } catch (error) {
      next(error)
    }
  }

  static addMovie = async (req, res, next) => {
    const { title, overview, poster_path, backdrop_path, release_date, rating } = req.body
    // const { user } = req.params

    try {
      const response = await Movie.create({
        title, overview, poster_path, backdrop_path, release_date, rating
      })
      console.log(response, 'berhasil add movie!')
      res.status(201).json(response)
    } catch (error) {
      next(error)
    }
  }

  static updateMovie = async (req, res, next) => {
    const { title, overview, poster_path, backdrop_path, release_date, rating } = req.body
    const { movieId } = req.params
    console.log('masuk update')
    try {
      const response = await Movie.findOneAndUpdate({_id: movieId}, {
        title, overview, poster_path, backdrop_path, release_date, rating
      })
      console.log(response, 'response pas update!!!')
      if (response) {
        res.status(200).json({
          status: 200,
          message: 'Success update movie'
        })
      } else {
        console.log('aaaaaa')
        res.status(400).json({
          status: 400,
          message: 'Movie ID is not found'
        })
      }
    } catch (error) {
      console.log('aa error')
      next(error)
    }
  }

  static deleteMovie = async (req, res, next) => {
    const { movieId } = req.params
    console.log('masuk delete')
    try {
      const response = await Movie.findOneAndDelete({ _id: movieId })
      console.log(response)
      if (response) {
        res.status(200).json({
          status: 200,
          message: 'Success delete movie'
        })
      } else {
        console.log('disini')
        res.status(400).json({
          status: 400,
          message: 'Movie ID is not found'
        })
      }
    } catch (error) {
      next(error)
    }
  }



  // static fetchMovies = async (req, res, next) => {
  //   try {
  //     const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)

  //     res.status(200).json(data.results)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // static fetchMovie = async (req, res, next) => {
  //   const { movieId } = req.params
  //   try {
  //     const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_KEY}&language=en-US`)

  //     res.status(200).json(data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}