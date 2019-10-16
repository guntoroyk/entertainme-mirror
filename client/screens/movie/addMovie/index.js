import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity, StatusBar } from 'react-native'
import AnimatedEllipsis from 'react-native-animated-ellipsis'
import { useMutation } from '@apollo/react-hooks'
import * as ImagePicker from 'expo-image-picker'
import DateTimePicker from "react-native-modal-datetime-picker"
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

  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false)

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
      // console.log(result, 'result pick poster image')
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

  const showDateTimePicker = () => {
    setIsDateTimePickerVisible(true)
  }

  const hideDateTimePicker = () => {
    setIsDateTimePickerVisible(false)
  }

  const handleDatePicked = date => {
    console.log('A date is picked', date)
    setreleaseDate(date.toString())
    hideDateTimePicker()
  }

  const [addMovie, { loading, error } ] = useMutation(ADD_MOVIE, {
    onCompleted() {
      setSuccessAdd(true)
      setTimeout(() => {
        setSuccessAdd(false)
        navigation.navigate('Movie')
      }, 1000)
    },
    onError() {
      setTimeout(() => {
        navigation.navigate('Movie')
      }, 2000)
    },
    update(cache, { data: { addMovie }}) {
      const { movies } = cache.readQuery({ query: FETCH_MOVIES })
      cache.writeQuery({
        query: FETCH_MOVIES,
        data: { movies: movies.concat([addMovie])}
      })
    }
  })

  const submitData = () => {
    addMovie({
      variables: {
        title,
        overview, 
        poster_path: posterPath,
        backdrop_path: backdropPath, 
        release_date: releaseDate.toLocaleString(), 
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
          color: constants.color.primary,
          fontSize: 72,
        }}
        animationDelay={150}/>
      </View>
    )
  }

  if (error) {
    console.log(JSON.stringify(error, null, 2))
    return (
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 23, color: 'red'}}> Max image size is 2mb </Text>
      </View>
    )
  }

  if (successAdd) {
    return (
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 23, color: constants.color.primary}}>Success!</Text>
      </View>
    )
  }
  return (
    <View style={ styles.container }>
      <StatusBar barStyle="light-content" />
      <View style={styles.boxHeader}>
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white'}}>Add Movies</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.form}>
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
              onChangeText={val => setRating(parseInt(val))}
              style={styles.input}
              placeholder="Required"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Release Date</Text>
            <View style={{ flexDirection: 'row', width: '100%'}}>
              <Text 
                style={ styles.input2 }
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                { releaseDate ? releaseDate : 'dd/mm/yyyy' }
              </Text>
              <TouchableOpacity
                  style={styles.buttonUpload}
                  activeOpacity={0.8}
                  onPress={ showDateTimePicker }
              >
                <Text style={{ color: 'white', alignSelf: 'center' }}>Date</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={ isDateTimePickerVisible }
                onConfirm={ handleDatePicked }
                onCancel={ hideDateTimePicker }
              />
            </View>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Poster</Text>
            <View style={{ flexDirection: 'row'}}>
              <Text 
                style={ styles.input2}
                numberOfLines={1}
                ellipsizeMode="head" 
              > { posterPathUriPrev ? posterPathUriPrev : 'No file choosen' } </Text>
              <TouchableOpacity
                style={styles.buttonUpload}
                activeOpacity={0.8}
                onPress={ () => { getPermissionAsync(); pickPosterImage() }}
              >
                <Text style={{ color: 'white', alignSelf: 'center' }}>File</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Backdrop</Text>
            <View style={{ flexDirection: 'row'}}>
              <Text 
                style={ styles.input2 }
                numberOfLines={1}
                ellipsizeMode="head" 
              > { backdropPathUriPrev ? backdropPathUriPrev : 'No file choosen' } </Text>
              <TouchableOpacity
                style={styles.buttonUpload}
                activeOpacity={0.8}
                onPress={ () => { getPermissionAsync(); pickBackdropImage() }}
              >
                <Text style={{ color: 'white', alignSelf: 'center' }}>File</Text>
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
        </View>
      </View>
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
    backgroundColor: constants.color.secondary,
  },
  boxHeader: {
    width: '100%',
    height: 70,
    backgroundColor: constants.color.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 15
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '90%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: constants.color.primary,
    borderRadius: 10
  }, 
  inputBox: {
    margin: 3,
  },
  text: {
    marginBottom: 5,
    fontSize: 15
  },
  input: {
    backgroundColor: constants.color.secondary,
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 5,

  },
  input2: {
    flex: 0.5, 
    backgroundColor: constants.color.secondary, 
    borderRadius: 5, 
    padding: 5, 
    marginRight: 5 
  },
  buttonUpload: {
    backgroundColor: constants.color.gray,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5
  },
  buttonSubmit: {
    backgroundColor: constants.color.gray,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginVertical: 5
  }

})

export default AddMovie
