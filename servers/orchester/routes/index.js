const router = require('express').Router()
const moviesRouter = require('./movie')
const tvShowsRouter = require('./tvShow')

router.get('/', (req, res) => {
  res.json('connectedd!!!')
})

router.use('/movies', moviesRouter)
// router.use('/tvShows', tvShowsRouter)

module.exports = router
