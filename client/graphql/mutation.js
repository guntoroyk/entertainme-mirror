import { gql } from 'apollo-boost'

export const ADD_MOVIE = gql`
  mutation addMovie(
    $title: String!,
    $overview: String!, 
    $poster_path: String!,
    $backdrop_path: String!, 
    $release_date: String!, 
    $rating: String! ) {
      
      addMovie(
        title: $title,
        overview: $overview, 
        poster_path: $poster_path,
        backdrop_path: $backdrop_path, 
        release_date: $release_date, 
        rating: $rating ) {

          _id
          title,
          overview, 
          poster_path,
          backdrop_path, 
          release_date, 
          rating 
      }
    }
`

