import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten'

import Ionicons from "react-native-vector-icons/Ionicons"
import * as constants from './constants'

import client from './graphql'
import Movie from './screens/movie'
import TvShow from './screens/tvshow'
import Favorite from './screens/favorite'

const AppNavigator = createBottomTabNavigator(
  {
    Movie,
    TvShow,
  },
  {
    initialRouteName: 'Movie',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;

        switch (routeName) {
          case "Movie":
            iconName = `md-film`;
            break;
          case "TvShow":
            iconName = `md-tv`;
            break;
          case "Favorite":
            iconName = `md-heart`;
            break;
          default:
            break;
        }

        return <IconComponent name={iconName} size={27} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: constants.color.primary,
      inactiveTintColor: 'gray'
    }
  }
)

const AppContainer = createAppContainer(AppNavigator)

const App = () => {
  return (
    <ApolloProvider client={ client }>
      <ApplicationProvider mapping={mapping} theme={lightTheme} >
        <AppContainer />
      </ApplicationProvider>
    </ApolloProvider>
  );
}

export default App
