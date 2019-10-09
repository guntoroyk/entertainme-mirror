const router = require('express').Router()
const movieRouter = require('./movie')
const favoriteMovie = require('./favoriteMovie')

router.get('/', (req, res) => {
  res.json('connected!')
})

router.use('/movies', movieRouter)
router.use('/favorites', favoriteMovie)

module.exports = router
