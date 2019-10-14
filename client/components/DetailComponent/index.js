import React from 'react'
import { Alert } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"

import { FETCH_MOVIE, FETCH_TVSHOW, FETCH_MOVIES, FETCH_TVSHOWS } from '../../graphql/query'
import { DELETE_MOVIE, DELETE_TVSHOW } from '../../graphql/mutation'

import { AirbnbRating, Rating } from 'react-native-ratings'
import * as constants from '../../constants'

const Detail = (props) => {
  const { movie, tvShow, navigation } = props
  const [deleteMovie, { loading, error }] = useMutation(DELETE_MOVIE, {
    onCompleted() {
      setTimeout(() => {
        navigation.navigate('Movie')
      }, 1000)
    },
    onError() {
      setTimeout(() => {
        navigation.navigate('Movie')
      }, 1000)
    },
    refetchQueries: [{ query: FETCH_MOVIES }],
    awaitRefetchQueries: true
  })

  const [deleteTvShow, { loadingDeleteTv, errorDeleteTv }] = useMutation(DELETE_TVSHOW, {
    onCompleted() {
      setTimeout(() => {
        navigation.navigate('TvShow')
      }, 1000)
    },
    onError() {
      setTimeout(() => {
        navigation.navigate('TvShow')
      }, 1000)
    },
    refetchQueries: [{ query: FETCH_TVSHOWS }],
    awaitRefetchQueries: true
  })
  let data
  if(movie) {
    data = {
      backdrop_path: movie.backdrop_path.image_url,
      poster_path: movie.poster_path.image_url,
      title: movie.title,
      date: movie.release_date,
      overview: movie.overview,
      rating: movie.rating
    }
  } else if (tvShow) {
    data = {
      backdrop_path: tvShow.backdrop_path.image_url,
      poster_path: tvShow.poster_path.image_url,
      title: tvShow.title,
      date: tvShow.release_date,
      overview: tvShow.overview,
      rating: tvShow.rating
    }
  }

  const handleEdit = () => {
    if (movie) {
      navigation.navigate('EditMovie', { movie }) 
    } else {
      navigation.navigate('EditTvShow', { tvShow }) 
    }
  }

  const deleteThis = () => {
    if (movie) {
      console.log('masuk delete movie')
      deleteMovie({
        variables: {
          id: movie._id
        }
      })
    } else {
      deleteTvShow({
        variables: {
          id: tvShow._id
        }
      })
    }
    console.log('deleted')
  }

  const handleDelete = () => {
    Alert.alert(
      'Warning',
      'Are you sure to delete this?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('canceled')
        },
        { 
          text: 'Ok', 
          onPress: () => deleteThis() 
        },
      ]
    )
  
  }

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{height: 230}}>
        <Image
          source={{uri: data.backdrop_path}} 
          style={{ height: '100%', borderBottomLeftRadius: 80}}
          resizeMode="stretch">
        </Image> 
        <View style={{flexDirection: 'row', justifyContent: 'space-between', top: -160}}>
          <Image 
            style={styles.poster}
            source={{uri: data.poster_path}}
          />

          <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={ handleEdit }
              style={{
                borderWidth: 0,
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: "black",
                alignItems:'center',
                justifyContent:'center',
                width: 50,
                height: 50,
                backgroundColor: 'white',
                borderRadius:50,
                right: 50,
                padding: 5,
                marginRight: 10
                
              }}
              >
              <Text><Ionicons name="md-create" size={30} color="" /> </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={ handleDelete }
              style={{
                borderWidth: 0,
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: "black",
                alignItems:'center',
                justifyContent:'center',
                width: 50,
                height: 50,
                backgroundColor: 'white',
                borderRadius:50,
                right: 50,
                padding: 5

              }}
              >
              <Text><Ionicons name="md-trash" size={30} color="" /> </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.information}>
        <View style={{marginBottom: 7}}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }} >{data.title}</Text>
          <Text style={{ fontSize: 13, color: constants.color.gray }} >{ movie ? 'Released at' : 'First air at' } {data.date}</Text>
        </View>
        <View style={{marginBottom: 7}}>
          <Text style={{ fontSize: 20, marginBottom: 5 }} >Rating : { data.rating }</Text>
          <View style={styles.rating}>
            <AirbnbRating 
              starContainerStyle={{
                alignSelf: 'flex-start',

              }}
              showRating={ false }  
              count={ 10 }
              isDisabled={ true }
              defaultRating={ data.rating }
              size={22}
            />
            
          </View>
        </View>
        <View style={{marginBottom: 5}}>
          <Text style={{ fontSize: 20, }} >Description</Text>
          <Text style={{ fontSize: 14, color: '#383d38' }} >{data.overview}</Text>
        </View>
      </View>

    </ScrollView>

  )
}

const styles = StyleSheet.create({
  poster: {
    width: 135,
    height: 190,
    left: 30,
    borderRadius: constants.size.borderRadius
  },
  information: {
    marginVertical: 50,
    marginHorizontal: 20,
  },
  rating: {

  }
})

export default Detail
