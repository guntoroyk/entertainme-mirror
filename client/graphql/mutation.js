import { gql } from 'apollo-boost'

export const ADD_MOVIE = gql`
  mutation addMovie(
    $title: String!,
    $overview: String!, 
    $poster_path: String!,
    $backdrop_path: String!, 
    $release_date: String!, 
    $rating: Int! ) {
      
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
          poster_path {
            image_url
          },
          backdrop_path {
            image_url
          }, 
          release_date, 
          rating 
      }
    }
`

export const EDIT_MOVIE = gql`
  mutation editMovie(
    $id: ID!
    $title: String!,
    $overview: String!, 
    $release_date: String!, 
    $rating: Int! ) {
      
      editMovie(
        id: $id
        title: $title,
        overview: $overview,
        release_date: $release_date, 
        rating: $rating ) {

          _id,
          title,
          overview,
          release_date, 
          rating,
          poster_path {
            image_url
          },
          backdrop_path {
            image_url
          }
      }
    }
`

export const DELETE_MOVIE = gql`
  mutation deleteMovie(
    $id: ID!
  ) {
    deleteMovie(
      id: $id
    ) {
      status, 
      message
    }
  }
`

export const ADD_TVSHOW = gql`
  mutation addTvShow(
    $title: String!,
    $overview: String!, 
    $poster_path: String!,
    $backdrop_path: String!, 
    $release_date: String!, 
    $rating: Int! ) {
      
      addTvShow(
        title: $title,
        overview: $overview, 
        poster_path: $poster_path,
        backdrop_path: $backdrop_path, 
        release_date: $release_date, 
        rating: $rating ) {

          _id
          title,
          overview, 
          poster_path {
            image_url
          },
          backdrop_path {
            image_url
          }, 
          release_date, 
          rating 
      }
    }
`

export const EDIT_TVSHOW = gql`
  mutation editTvShow(
    $id: ID!
    $title: String!,
    $overview: String!, 
    $release_date: String!, 
    $rating: Int! ) {
      
      editTvShow(
        id: $id
        title: $title,
        overview: $overview,
        release_date: $release_date, 
        rating: $rating ) {

          _id
          title,
          overview, 
          poster_path {
            image_url
          },
          backdrop_path {
            image_url
          }, 
          release_date, 
          rating 
      }
    }
`
export const DELETE_TVSHOW = gql`
  mutation deleteTvShow(
    $id: ID!
  ) {
    deleteTvShow(
      id: $id
    ) {
      status, 
      message
    }
  }
`
