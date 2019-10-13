const { ApolloServer } = require('apollo-server')

import { movies, movie } from './queries/movies'
import { tvShows, tvShow } from './queries/tvShows'
import { addMovie, editMovie, deleteMovie } from './mutations/movies'
import { addTvShow, editTvShow, deleteTvShow } from './mutations/tvShows'
import typeDefs from './types'

const resolvers = {
  Query: {
    movies,
    movie,
    tvShows,
    tvShow
  },

  Mutation: {
    addMovie,
    editMovie,
    deleteMovie,
    addTvShow,
    editTvShow,
    deleteTvShow
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
