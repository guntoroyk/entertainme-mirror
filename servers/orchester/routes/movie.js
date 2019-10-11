const router = require('express').Router()
const MovieController = require('../controllers/movie')

router.get('/', MovieController.fetchMovies)
router.post('/', MovieController.addMovie)
router.get('/:movieId', MovieController.fetchMovie)
router.delete('/:movieId', MovieController.deleteMovie)

module.exports = router
