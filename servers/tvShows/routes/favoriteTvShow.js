const router = require('express').Router()
const FavoriteController = require('../controllers/favoriteTvShow')

router.get('/:user', FavoriteController.fetchFavoriteTvShows)
router.get('/:user/:tvShowId', FavoriteController.fetchFavoriteTvShow)
router.post('/:user/', FavoriteController.addToFavorite)
router.patch('/:user/:tvShowId', FavoriteController.deleteFavorite)

module.exports = router
