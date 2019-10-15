const TvShow = require('../models/tvShow')

module.exports = class TvShowController {
  static fetchTvShows = async (req, res, next) => {
    // const { user } = req.params
    try {
      const response = await TvShow.find({ })
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  static fetchTvShow = async (req, res, next) => {
    const { tvShowId } = req.params
    // console.log(req.params)
    try {
      const response = await TvShow.findOne({_id: tvShowId})
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  static addTvShow = async (req, res, next) => {
    const { title, overview, poster_path, backdrop_path, release_date, rating } = req.body
    // const { user } = req.params
    console.log(req.body, 'dari addTvShow')
    try {
      const response = await TvShow.create({
        title, overview, poster_path, backdrop_path, release_date, rating
      })
      console.log(response, 'berhasil add tvshow!')
      res.status(201).json(response)
    } catch (error) {
      console.log(error, 'error add tv show')
      next(error)
    }
  }

  static updateTvShow = async (req, res, next) => {
    const { title, overview, release_date, rating } = req.body
    const { tvShowId } = req.params
    console.log('masuk update')
    try {
      const response = await TvShow.findOneAndUpdate({_id: tvShowId}, {
        title, overview, release_date, rating
      }, { new: true })
      console.log(response, 'response pas update!!!')

      res.status(200).json(response)
      // if (response) {
      //   res.status(200).json({
      //     status: 200,
      //     message: 'Success update tv show'
      //   })
      // } else {
      //   console.log('aaaaaa')
      //   res.status(400).json({
      //     status: 400,
      //     message: 'TvShow ID is not found'
      //   })
      // }
    } catch (error) {
      console.log('aa error')
      next(error)
    }
  }

  static deleteTvShow = async (req, res, next) => {
    const { tvShowId } = req.params
    console.log('masuk delete')
    try {
      const response = await TvShow.findOneAndDelete({ _id: tvShowId })
      console.log(response)
      if (response) {
        res.status(200).json({
          status: 200,
          message: 'Success delete tv show'
        })
      } else {
        console.log('disini')
        res.status(400).json({
          status: 400,
          message: 'TvShow ID is not found'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}
