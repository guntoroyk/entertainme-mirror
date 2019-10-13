import React from 'react'
import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import * as constants from '../../constants'
import MovieList from './movieList'
import MovieDetail from './movieDetail'
import AddMovie from './addMovie'

const MovieStackNavigator = createStackNavigator(
  {
    Movie: MovieList,
    Detail: MovieDetail,
    FormMovie: AddMovie
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
