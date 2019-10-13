const axios = require('axios')
const qs = require('querystring')

module.exports = {
  uploadPosterPath (req, res, next) {
    if (!req.body.poster_path) {
      next()
    } else {
      axios({
        url: `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        method: 'POST',
        config: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        data: qs.stringify({ image: req.body.poster_path }),
      })
      .then(({ data }) => {
        req.body.poster_path = {
          image_url: data.data.image_url,
          delete_url: data.data.delete_url
        }
        next()
      })
      .catch(({ response }) => {
        next(response)
      })
    }
  },

  uploadBackdropPath (req, res, next) {
    if (!req.body.backdrop_path) {
      next()
    } else {
      axios({
        url: `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        method: 'POST',
        config: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        data: qs.stringify({ image: req.body.backdrop_path }),
      })
      .then(({ data }) => {
        req.body.backdrop_path = {
          image_url: data.data.image_url,
          delete_url: data.data.delete_url
        }
        next()
      })
      .catch(({ response }) => {
        next(response)
      })
    }
  }
}
