const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const MoviesAPI = require('./datasources/movie')

const typeDefs = gql`
  type Query {
    movies: [Movie],
    movie (id: String): Movie
  }

  type Mutation {
    addMovie (
      title: String, 
      overview: String, 
      poster_path: String,
      backdrop_path: String, 
      release_date: String, 
      rating: Int
    ): Movie,

    deleteMovie (id: String): Message,

    updateMovie (
      id: String, 
      title: String, 
      overview: String, 
      poster_path: String,
      backdrop_path: String, 
      release_date: String, 
      rating: Int
    ) : Message
  }

  type Movie {
    _id: String
    title: String
    overview: String
    poster_path: String
    backdrop_path: String
    release_date: String
    rating: Int
  }

  type Message {
    status: Int,
    message: String
  }
`

const resolvers = {
  Query: {
    movies: (parents, args, context) => {
      return context.dataSources.movies.getMovies()
    },
    movie: (parents, args, context) => {
      return context.dataSources.movies.getMovie(args.id)
    }
  },

  Mutation: {
    addMovie: (parent, args, context) => {
      const newMovie = {
        title: args.title, 
        overview: args.overview, 
        poster_path: args.poster_path,
        backdrop_path: args.backdrop_path, 
        release_date: args.release_date, 
        rating: args.rating
      }
      context.dataSources.movies.addMovie(newMovie)
      return newMovie
    },
    updateMovie: (parent, args, context) => {
      const updatedMovie = {
        title: args.title, 
        overview: args.overview, 
        poster_path: args.poster_path,
        backdrop_path: args.backdrop_path, 
        release_date: args.release_date, 
        rating: args.rating
      }
      return context.dataSources.movies.updateMovie(args.id, updatedMovie)
    },
    deleteMovie: (parent, args, context) => {
      return context.dataSources.movies.deleteMovie(args.id)
    }
  }

}

const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: [resolvers]
})

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      movies: new MoviesAPI()
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
