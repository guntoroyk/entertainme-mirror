import { gql } from 'apollo-server'

export default gql`
  type Query {
    movies: [Movie],
    movie (id: ID): Movie,
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
      
    deleteMovie (id: ID): Message,
      
    editMovie (
      id: ID, 
      title: String, 
      overview: String, 
      poster_path: String,
      backdrop_path: String, 
      release_date: String, 
      rating: Int
    ) : Message,
        
    upload (file: Upload!): String
  }
      
  type Movie {
    _id: ID
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
