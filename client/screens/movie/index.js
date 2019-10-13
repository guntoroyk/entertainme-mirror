import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import MovieList from './movieList'
import MovieDetail from './movieDetail'
import AddMovie from './addMovie'
import EditMovie from './editMovie'

const MovieStackNavigator = createStackNavigator(
  {
    Movie: MovieList,
    Detail: MovieDetail,
    FormMovie: AddMovie,
    EditMovie: EditMovie
  },
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  }
)

export default MovieStackNavigator
