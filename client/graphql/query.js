import { gql } from 'apollo-boost'

export const FETCH_MOVIES = gql`
  query {
    movies {
      _id,
      title,
      overview,
      poster_path {
        image_url
      },
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
        poster_path {
          image_url
        },
        backdrop_path {
          image_url
        },
        rating,
        release_date
      }
    }
  `
}

export const FETCH_TVSHOWS = gql`
  query {
    tvShows {
      _id,
      title,
      overview,
      poster_path {
        image_url
      },
      release_date
    }
  }
`

export const FETCH_TVSHOW = id => {
  return gql`
    query {
      tvShow (id: "${id}") {
        _id,
        title,
        overview,
        poster_path {
          image_url
        },
        backdrop_path {
          image_url
        },
        rating,
        release_date
      }
    }
  `
}
