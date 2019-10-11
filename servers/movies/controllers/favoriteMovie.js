// const FavoriteMovie = require('../models/favoriteMovie')

// module.exports = class FavoriteMovieController {

//   static fetchFavoriteMovies = async (req, res, next) => {
//     const { user } = req.params
//     try {
//       const response = await FavoriteMovie.find({user})
//       res.status(200).json(response)
//     } catch (error) {
//       next(error)
//     }
//   }

//   static fetchFavoriteMovie = async (req, res, next) => {
//     const { user, movieId } = req.params
//     try {
//       const response = await FavoriteMovie.find({user, _id: movieId})
//       res.status(200).json(response)
//     } catch (error) {
//       next(error)
//     }
//   }

//   static addToFavorite = async (req, res, next) => {
//     const { title, overview, poster_path, backdrop_path, release_data, vote_average } = req.body
//     const { user } = req.params

//     try {
//       const response = await FavoriteMovie.create({
//         title, overview, poster_path, backdrop_path, release_data, vote_average, user
//       })
//       res.status(201).json(response)
//     } catch (error) {
//       next(error)
//     }
//   }

//   static deleteFavorite = async (req, res, next) => {
//     const { user, movieId } = req.params

//     try {
//       const response = await FavoriteMovie.findOneAndDelete({ user, _id: movieId })
//       res.status(200).json(response)
//     } catch (error) {
//       next(error)
//     }
//   }

// }