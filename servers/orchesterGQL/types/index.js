import { gql } from 'apollo-server'

export default gql`
  type Query {
    movies: [Movie],
    movie (id: ID): Movie,
    tvShows: [TvShow],
    tvShow (id: ID): TvShow
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

    addTvShow (
      title: String, 
      overview: String, 
      poster_path: String,
      backdrop_path: String, 
      release_date: String, 
      rating: Int
    ): Movie,
      
    deleteTvShow (id: ID): Message,
      
    editTvShow (
      id: ID, 
      title: String, 
      overview: String, 
      poster_path: String,
      backdrop_path: String, 
      release_date: String, 
      rating: Int
    ) : Message,
        
  }
      
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: Img
    backdrop_path: Img
    release_date: String
    rating: Int
  }

  type TvShow {
    _id: ID
    title: String
    overview: String
    poster_path: Img
    backdrop_path: Img
    release_date: String
    rating: Int
  }

  type Img {
    image_url: String,
    delete_url: String
  }

  type Message {
    status: Int,
    message: String
  }
`
