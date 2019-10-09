const router = require('express').Router()
const MovieController = require('../controllers/movie')

router.get('/', MovieController.fetchMovies)
router.get('/:movieId', MovieController.fetchMovie)

router.get('/favorites/:user', MovieController.fetchFavoriteMovies)
router.get('/favorites/:user/:movieId', MovieController.fetchFavoriteMovie)

router.post('/favorites/:user/:movieId', MovieController.addFavorite)
router.delete('/favorites/:user/:movieId', MovieController.deleteFavorite)

module.exports = router
