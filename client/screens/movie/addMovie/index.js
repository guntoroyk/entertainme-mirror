import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import AnimatedEllipsis from 'react-native-animated-ellipsis'
import { useMutation } from '@apollo/react-hooks'
import * as ImagePicker from 'expo-image-picker'
import { Input, Datepicker, Layout } from 'react-native-ui-kitten'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import * as constants from '../../../constants'

import { ADD_MOVIE } from '../../../graphql/mutation'
import { FETCH_MOVIES } from '../../../graphql/query'

const AddMovie = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [rating, setRating] = useState('')
  const [releaseDate, setreleaseDate] = useState('')
  const [posterPath, setPosterPath] = useState('')
  const [posterPathUriPrev, setPosterPathUriPrev] = useState(null)
  const [backdropPath, setBackdropPath] = useState('')
  const [backdropPathUriPrev, setBackdropPathUriPrev] = useState(null)
  const [successAdd, setSuccessAdd] = useState(false)

  const getPermissionAsync = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('We need camera roll permission to upload an image')
      }
    }
  }

  const pickPosterImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsediting: true,
      aspect: [4, 3]
    })

    if (!result.cancelled) {
      setPosterPath(result.base64)
      setPosterPathUriPrev(result.uri)
      // console.log(result.uri)
    }
  }

  const pickBackdropImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsediting: true,
      aspect: [4, 3]
    })

    if (!result.cancelled) {
      setBackdropPath(result.base64)
      setBackdropPathUriPrev(result.uri)
    }
  }

  const [addMovie, { loading, error } ] = useMutation(ADD_MOVIE, {
    onCompleted() {
      setSuccessAdd(true)
      setTimeout(() => {
        setSuccessAdd(false)
        navigation.navigate('Movie')
      })
    },
    onError() {
      // setTimeout(() => {
      //   navigation.navigate('Movie')
      // })
    },
    // update(cache, { data: { addMovie }}) {
    //   const { movies } = cache.readQuery({ query: FETCH_MOVIES })
    //   cache.writeQuery({
    //     query: FETCH_MOVIES,
    //     data: { movies: movies.concat([addMovie])}
    //   })
    // }
  })

  const submitData = () => {
    addMovie({
      variables: {
        title,
        overview, 
        posterPath,
        backdropPath, 
        releaseDate, 
        rating 
      }
    })
  }

  if (loading) {
    return (
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text>Please wait</Text>
        <AnimatedEllipsis
        numberOfDots={4}
        style={{
          color: 'rgb(54, 90, 209)',
          fontSize: 72,
        }}
        animationDelay={150}/>
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 23, color: 'red'}}>{ error }</Text>
      </View>
    )
  }
  return (
    <View style={ styles.container }>
      <Layout style={styles.form}>
        <View style={styles.inputBox}>
          <Text style={styles.text}>Title</Text>
          <TextInput
            onChangeText={val => setTitle(val)}
            style={styles.input}
            placeholder="Required"
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.text}>Overview</Text>
          <TextInput
            onChangeText={val => setOverview(val)}
            style={styles.input}
            placeholder="Required"
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.text}>Rating</Text>
          <TextInput
            onChangeText={val => setRating(val)}
            style={styles.input}
            placeholder="Required"
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.text}>Release Date</Text>
          <Datepicker
            date={ releaseDate }
            onSelect={ date => setreleaseDate(date) }
            style={ styles.input }
          />
        </View>
        <View style={styles.inputImg}>
          <Text style={styles.text}>Poster</Text>
          <View style={{ width: 225 }}>
            <Text 
              numberOfLines={1}
              ellipsizeMode="head" 
            > { posterPathUriPrev ? posterPathUriPrev : 'No file choosen' } </Text>
            <TouchableOpacity
              style={styles.buttonUpload}
              activeOpacity={0.8}
              onPress={ () => { getPermissionAsync(); pickPosterImage() }}
            >
              <Text style={{ color: 'white', alignSelf: 'center' }}>Pick an image</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputImg}>
          <Text style={styles.text}>Backdrop</Text>
          <View style={{ width: 225 }}>
            <Text 
              numberOfLines={1}
              ellipsizeMode="head" 
            > { backdropPathUriPrev ? backdropPathUriPrev : 'No file choosen' } </Text>
            <TouchableOpacity
              style={styles.buttonUpload}
              activeOpacity={0.8}
              onPress={ () => { getPermissionAsync(); pickBackdropImage() }}
            >
              <Text style={{ color: 'white', alignSelf: 'center' }}>Pick an image</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputBox}>
          <TouchableOpacity 
            style={ styles.buttonSubmit }
            onPress={ submitData }
          >
            <Text style={{ color: 'white', alignSelf: 'center' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    </View>
  )
}

AddMovie.navigationOptions = {
  headerTitle: 'Add Movie',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    marginTop: Constants.statusBarHeight,
    height: '90%',
    width: '90%',
    // backgroundColor: '#F4F4F4'
  }, 
  inputBox: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    marginVertical: 2,
  },
  inputImg: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    marginVertical: 2,
  },
  text: {
    width: 100,
    letterSpacing: 1,
    color: 'rgb(10,10,10)'
  },
  input: {
    height: '100%',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
    paddingHorizontal: 13,
    flexGrow: 1,
  },
  buttonUpload: {
    backgroundColor: 'rgba(165, 165, 165, .7)',
    justifyContent: 'center',
    borderRadius: 5,
    height: 30,
  },
  buttonSubmit: {
    marginTop: 30,
    backgroundColor: 'rgba(165, 165, 165, .7)',
    justifyContent: 'center',
    height: 40,
    width: '100%',
    borderRadius: 5,
  }
})

export default AddMovie
