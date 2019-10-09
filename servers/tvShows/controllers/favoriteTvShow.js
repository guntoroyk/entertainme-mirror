const FavoriteTvShow = require('../models/favoriteTvShow')

module.exports = class FavoriteMovieController {

  static fetchFavoriteTvShows = async (req, res, next) => {
    const { user } = req.params
    try {
      const response = await FavoriteTvShow.find({user})
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  static fetchFavoriteTvShow = async (req, res, next) => {
    const { user, tvShowId } = req.params
    try {
      const response = await FavoriteTvShow.find({user, _id: tvShowId})
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  static addToFavorite = async (req, res, next) => {
    const { name, overview, poster_path, backdrop_path, first_air_data, vote_average } = req.body
    const { user } = req.params

    try {
      const response = await FavoriteTvShow.create({
        name, overview, poster_path, backdrop_path, first_air_data, vote_average, user
      })
      res.status(201).json(response)
    } catch (error) {
      next(error)
    }
  }

  static deleteFavorite = async (req, res, next) => {
    const { user, tvShowId } = req.params

    try {
      const response = await FavoriteTvShow.findOneAndDelete({ user, _id: tvShowId })
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

}
