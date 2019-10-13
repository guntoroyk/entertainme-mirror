const router = require('express').Router()
const tvShowRouter = require('./tvShow.js')

router.get('/', (req, res) => {
  res.json('connected!')
})

router.use('/tvshows', tvShowRouter)

module.exports = router
