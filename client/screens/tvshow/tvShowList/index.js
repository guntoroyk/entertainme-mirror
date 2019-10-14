import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, StatusBar, FlatList, Text, TouchableOpacity, RefreshControl } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_TVSHOWS } from '../../../graphql/query'
import Constants from 'expo-constants'
import Ionicons from "react-native-vector-icons/Ionicons"

import * as constants from '../../../constants'
import Card from '../../../components/card'
import Loader from '../../../components/loader'
import AddTvShow from '../addTvShow'

// console.log(Constants.statusBarHeight, 'tinggi statusbar')
const TvShowList = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(FETCH_TVSHOWS)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    console.log('refreshing', refreshing)
    refetch().finally(() => {
      setRefreshing(false)
      console.log('refreshing', refreshing)
    })
  })

  useEffect(() => {
    console.log(data, 'dari tv show list')
  }, [data])
  const [inputFocus, setInputFocus] = useState(null)
  return (
    <View style={ styles.container }>
      <StatusBar barStyle="light-content" />
      <View style={styles.boxHeader}>
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white'}}>Tv Shows</Text>
          <TouchableOpacity onPress={ () => navigation.navigate('FormTvShow')}>
            <Text>
              <Ionicons 
                name="ios-add"
                size={27}
                color='white'
                style={{ fontSize: 35 }}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

     { loading || refreshing ? 
        <Loader />
        :
        <FlatList 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={ styles.flatList } 
        data={ data.tvShows } 
        renderItem={ ({ item }) => (
          <Card
            data={ item }
            navigation={ navigation }
          />
        )}
        keyExtractor={item => String(item._id)}
        />
     }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.color.secondary,
  },
  boxHeader: {
    width: '100%',
    height: 70,
    backgroundColor: constants.color.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 7,
    paddingHorizontal: 15,
    marginBottom: 10
  },
  flatList: {
    paddingTop: constants.size.space,
    marginBottom: constants.size.space,
  },
  addButton: {
    width: '',
    height: '100%',
    backgroundColor: 'rgb(54, 90, 209)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
})

const TvShowListNavigator = createSwitchNavigator({
  TvShowList,
  AddTvShow
})

const TvShowListContainer = createAppContainer(TvShowListNavigator)


TvShowListContainer.navigationOptions = {
  headerTitle: 'Tv Shows',
  headerTitleStyle: {
    color: 'white'
  },
  headerStyle: {
    backgroundColor: constants.color.primary
  }
}


export default TvShowListContainer
