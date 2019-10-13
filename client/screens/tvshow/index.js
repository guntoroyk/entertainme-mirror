import React from 'react'
import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import * as constants from '../../constants'
import TvShowList from './tvShowList'
import TvShowDetail from './tvShowDetail'
import AddTvShow from './addTvShow'
import EditTvShow from './editTvShow'

const TvShowStackNavigator = createStackNavigator(
  {
    TvShow: TvShowList,
    Detail: TvShowDetail,
    FormTvShow: AddTvShow,
    EditTvShow: EditTvShow
  },
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  }
)

export default TvShowStackNavigator
