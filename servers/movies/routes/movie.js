const router = require('express').Router()
const MovieController = require('../controllers/movie')

router.get('/', MovieController.fetchMovies)
router.get('/:movieId', MovieController.fetchMovie)

module.exports = router
