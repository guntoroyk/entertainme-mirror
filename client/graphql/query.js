import { gql } from 'apollo-boost'

export const FETCH_MOVIES = gql`
  query {
    movies {
      _id,
      title,
      overview,
      poster_path,
      release_date
    }
  }
`

export const FETCH_MOVIE = id => {
  return gql`
    query {
      movie (id: "${id}") {
        _id,
        title,
        overview,
        poster_path,
        backdrop_path,
        rating,
        release_date
      }
    }
  `
}
