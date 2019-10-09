const router = require('express').Router()
const TvShowController = require('../controllers/tvShow')

router.get('/', TvShowController.fetchTvShows)
router.get('/:tvShowId', TvShowController.fetchTvShow)

module.exports = router
