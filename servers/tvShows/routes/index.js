const router = require('express').Router()
const tvShowRouter = require('./tvShow.js')
const favoriteTvShow = require('./favoriteTvShow')

router.get('/', (req, res) => {
  res.json('connected!')
})

router.use('/tvshows', tvShowRouter)
router.use('/favorites', favoriteTvShow)

module.exports = router
