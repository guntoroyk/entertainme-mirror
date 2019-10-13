const router = require('express').Router()
const MovieController = require('../controllers/movie')
const { uploadPosterPath, uploadBackdropPath } = require('../middlewares/imgbb')
// fetch from API
// router.get('/', MovieController.fetchMovies) 
// router.get('/:movieId', MovieController.fetchMovie)

router.get('/', MovieController.fetchMovies)
router.post('/', uploadPosterPath, uploadBackdropPath, MovieController.addMovie)
router.put('/:movieId', MovieController.updateMovie)
router.get('/:movieId', MovieController.fetchMovie)
router.delete('/:movieId', MovieController.deleteMovie)

module.exports = router
