import React from 'react'
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { AirbnbRating, Rating } from 'react-native-ratings'
import * as constants from '../../constants'

const Detail = (props) => {
  const { movie, tvShow } = props
  let data
  if(movie) {
    data = {
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
      title: movie.title,
      date: movie.release_date,
      overview: movie.overview,
      rating: movie.rating
    }
  } else {
    data = {
      backdrop_path: tvShow.backdrop_path,
      poster_path: tvShow.poster_path,
      title: tvShow.name,
      subtitle: tvShow.status,
      date: tvShow.first_air_date,
      overview: tvShow.overview
    }
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

          <TouchableOpacity
            style={{
              borderWidth: 0,
              borderColor: constants.color.primary,
              alignItems:'center',
              justifyContent:'center',
              width: 60,
              height: 60,
              backgroundColor: constants.color.primary,
              borderRadius:50,
              alignSelf: 'flex-end',
              right: 50
            }}
            >
            <Icon name="ios-heart" size={40} color="white" /> 
          </TouchableOpacity>
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