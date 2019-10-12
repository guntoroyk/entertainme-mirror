const { ApolloServer } = require('apollo-server')

import { movies, movie } from './queries/movies'
import { addMovie, editMovie, deleteMovie } from './mutations/movies'
import typeDefs from './types'

const resolvers = {
  Query: {
    movies,
    movie,
  },

  Mutation: {
    addMovie,
    editMovie,
    deleteMovie,
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

// const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
// const MoviesAPI = require('./datasources/movie')
// const fs = require('fs')

// const typeDefs = gql`
//   type Query {
//     movies: [Movie],
//     movie (id: String): Movie,
//     uploads: [File]
//   }

//   type Mutation {
//     addMovie (
//       title: String, 
//       overview: String, 
//       poster_path: String,
//       backdrop_path: String, 
//       release_date: String, 
//       rating: Int
//     ): Movie,

//     deleteMovie (id: String): Message,

//     updateMovie (
//       id: String, 
//       title: String, 
//       overview: String, 
//       poster_path: String,
//       backdrop_path: String, 
//       release_date: String, 
//       rating: Int
//     ) : Message,

//     upload (file: Upload!): String
//   }

//   type Movie {
//     _id: String
//     title: String
//     overview: String
//     poster_path: String
//     backdrop_path: String
//     release_date: String
//     rating: Int
//   }

//   type Message {
//     status: Int,
//     message: String
//   }

//   type File {
//     filename: String!
//     mimetype: String!
//     encoding: String!
//   }
// `

// const resolvers = {
//   Query: {
//     movies: (parents, args, context) => {
//       return context.dataSources.movies.getMovies()
//     },
//     movie: (parents, args, context) => {
//       return context.dataSources.movies.getMovie(args.id)
//     }
//   },

//   Mutation: {
//     addMovie: (parent, args, context) => {
//       const newMovie = {
//         title: args.title, 
//         overview: args.overview, 
//         poster_path: args.poster_path,
//         backdrop_path: args.backdrop_path, 
//         release_date: args.release_date, 
//         rating: args.rating
//       }
//       context.dataSources.movies.addMovie(newMovie)
//       return newMovie
//     },
//     updateMovie: (parent, args, context) => {
//       const updatedMovie = {
//         title: args.title, 
//         overview: args.overview, 
//         poster_path: args.poster_path,
//         backdrop_path: args.backdrop_path, 
//         release_date: args.release_date, 
//         rating: args.rating
//       }
//       return context.dataSources.movies.updateMovie(args.id, updatedMovie)
//     },
//     deleteMovie: (parent, args, context) => {
//       return context.dataSources.movies.deleteMovie(args.id)
//     },
//     upload: async (parent, args) => {
//       const { createReadStream, filename } = await args.file
//       const stream = createReadStream()
//       const path = `./uploads/${Math.floor(Math.random() * 1000)}-${filename}`
//       return new Promise ((resolve, reject) => {
//         stream
//           .on('error', error => {
//             if (stream.truncated)
//               fs.unlinkSync(path)
//             reject(error)
//           })
//           .pipe(fs.createWriteStream(path))
//           .on('error', error => reject(error))
//           .on('finish', () => resolve(path))
//       })
//     }
//   }

// }

// // const schema = makeExecutableSchema({
// //   typeDefs: [typeDefs],
// //   resolvers: [resolvers]
// // })

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   dataSources: () => {
//     return {
//       movies: new MoviesAPI()
//     }
//   }
// })

// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`)
// })
