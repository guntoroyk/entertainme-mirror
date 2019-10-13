import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import * as constants from '../../constants'

const Card = (props) => {
  const { data } = props
  console.log(data, 'dari cardd')
  return (
    <TouchableOpacity style={styles.container} onPress={ () => props.navigation.navigate('Detail', { dataId: data._id }) } >
      <Image 
        style={styles.image} 
        source={{ uri: data.poster_path }}
      />
     <View style={styles.information}>
        <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold' }}>
          { data.title || data.name }
        </Text>
        <Text style={{ fontSize: 12, color: constants.color.gray }}>
          Release Date: { data.release_date || data.first_air_date }
        </Text>
        <Text numberOfLines={3} style={{ color: '#383d38' }}>
          { data.overview }
        </Text>
     </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    backgroundColor: constants.color.primary,
    width: '90%',
    height: 150,
    alignSelf: 'center',
    marginHorizontal: 80,
    borderRadius: constants.size.borderRadius,
    marginVertical: constants.size.space,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  image: {
    width: 90,
    height: '100%',
    marginHorizontal: constants.size.space,
    borderRadius: constants.size.borderRadius,
    position: 'absolute',
    top: -15
  },
  information: {
    marginLeft: 115,
    marginRight: constants.size.space,
    marginTop: constants.size.space
  }
})

export default Card
