const router = require('express').Router()
const TvShowController = require('../controllers/tvShow')
const { uploadPosterPath, uploadBackdropPath } = require('../middlewares/imgbb.js')

router.get('/', TvShowController.fetchTvShows)
router.post('/', uploadPosterPath, uploadBackdropPath, TvShowController.addTvShow)
router.put('/:tvShowId', TvShowController.updateTvShow)
router.get('/:tvShowId', TvShowController.fetchTvShow)
router.delete('/:tvShowId', TvShowController.deleteTvShow)

module.exports = router
