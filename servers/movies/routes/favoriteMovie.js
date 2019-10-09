const router = require('express').Router()
const FavoriteController = require('../controllers/favoriteMovie')

router.get('/:user', FavoriteController.fetchFavoriteMovies)
router.get('/:user/:movieId', FavoriteController.fetchFavoriteMovie)
router.post('/:user/', FavoriteController.addToFavorite)
router.patch('/:user/:movieId', FavoriteController.deleteFavorite)

module.exports = router
