const { RESTDataSource } = require('apollo-datasource-rest')

class MoviesAPI extends RESTDataSource {
  constructor () {
    super ()
    this.baseURL = 'http://localhost:3001'
  }

  async getMovies () {
    return this.get('/movies')
  }

  async getMovie (id) {
    console.log(id)
    return this.get(`/movies/${id}`)
  }

  async addMovie (movie) {
    return this.post(`/movies`, movie)
  }

  async updateMovie (id, movie) {
    return this.patch(`/movies/${id}`, movie)
  }

  async deleteMovie (id) {
    return this.delete(`/movies/${id}`)
  }

}

module.exports = MoviesAPI
