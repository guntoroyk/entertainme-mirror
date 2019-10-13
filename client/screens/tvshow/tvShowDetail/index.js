import React from 'react'
import { StatusBar, View, Text } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_TVSHOW } from '../../../graphql/query'
import Loader from '../../../components/loader'
import DetailComponent from '../../../components/DetailComponent'
import * as constants from '../../../constants'

const TvShowDetail =  ({ navigation }) => {
  const tvShowId = navigation.getParam('dataId', null)
  console.log(tvShowId, 'tvShowId')
  const { loading, error, data } = useQuery(FETCH_TVSHOW(tvShowId))
  console.log(data, 'data tv show detaill')
  if (loading) return <Loader />
  else if (error) return (
    <View>
      <Text>{ JSON.stringify(error, null, 2) }</Text>
    </View>
  )
  return (
    <>
      <StatusBar barStyle="light-content" />
      <DetailComponent tvShow={ data.tvShow } navigation={ navigation } />
      
    </>
  )
}

TvShowDetail.navigationOptions = {
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

export default TvShowDetail
