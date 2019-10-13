const router = require('express').Router()
const tvShowController = require('../controllers/tvShow')

router.get('/', tvShowController.fetchtvShows)
router.post('/', tvShowController.addtvShow)
router.get('/:tvShowId', tvShowController.fetchtvShow)
router.delete('/:tvShowId', tvShowController.deletetvShow)

module.exports = router
