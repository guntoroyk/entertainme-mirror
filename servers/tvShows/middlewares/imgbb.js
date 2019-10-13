const axios = require('axios')
const qs = require('querystring')

module.exports = {
  uploadPosterPath (req, res, next) {
    if (!req.body.poster_path) {
      next()
    } else {
      console.log('masuk imgp upload poster!', req.body.poster_path)
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
        console.log(data.data.url, 'upload poster Path!!')
        req.body.poster_path = {
          image_url: data.data.url,
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
          image_url: data.data.url,
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
