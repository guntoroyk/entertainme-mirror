import React from 'react'
import { StatusBar, View, Text } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_MOVIE } from '../../../graphql/query'
import Loader from '../../../components/loader'
import DetailComponent from '../../../components/DetailComponent'
import * as constants from '../../../constants'

const MovieDetail =  ({ navigation }) => {
  const movieId = navigation.getParam('dataId', null)
  // console.log(movieId, 'movieId')
  const { loading, error, data } = useQuery(FETCH_MOVIE(movieId))
  // console.log(data)
  if (loading || !data) return <Loader />
  else if (error) return (
    <View>
      <Text>{ JSON.stringify(error, null, 2) }</Text>
    </View>
  )
  return (
    <>
      <StatusBar barStyle="light-content" />
      <DetailComponent movie={ data.movie } navigation={ navigation } />
      
    </>
  )
}

MovieDetail.navigationOptions = {
  headerTitle: 'Detail',
  headerTitleStyle: {
    color: 'white'
  },
  headerStyle: {
    backgroundColor: constants.color.primary
  },
  headerBackTitleStyle: {
    color: 'white'
  }
}

export default MovieDetail
