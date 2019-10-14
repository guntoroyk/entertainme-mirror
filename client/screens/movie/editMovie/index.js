import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity, StatusBar } from 'react-native'
import AnimatedEllipsis from 'react-native-animated-ellipsis'
import { useMutation } from '@apollo/react-hooks'
import DateTimePicker from "react-native-modal-datetime-picker"
import * as constants from '../../../constants'

import { EDIT_MOVIE } from '../../../graphql/mutation'
import { FETCH_MOVIE } from '../../../graphql/query'

const EditMovie = ({ navigation }) => {
  const movie = navigation.getParam('movie', null)

  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [rating, setRating] = useState('')
  const [releaseDate, setreleaseDate] = useState('')
  const [successAdd, setSuccessAdd] = useState(false)

  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false)

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

  const [editMovie, { loading, error } ] = useMutation(EDIT_MOVIE, {
    onCompleted() {
      setSuccessAdd(true)
      setTimeout(() => {
        setSuccessAdd(false)
        navigation.navigate('Detail')
      }, 1000)
    },
    onError() {
      setTimeout(() => {
        navigation.navigate('Detail')
      })
    },
    refetchQueries: [{query: FETCH_MOVIE(movie._id)}],
    awaitRefetchQueries: true
  })

  const submitData = () => {
    editMovie({
      variables: {
        id: movie._id,
        title,
        overview, 
        release_date: releaseDate.toLocaleString(), 
        rating: parseInt(rating)
      }
    })
  }

  useEffect(() => {
    console.log(movie, 'edit movieee')
    if (movie) {
      setTitle(movie.title)
      setOverview(movie.overview)
      setRating(movie.rating.toString())
      setreleaseDate(movie.release_date)
    }
  }, [])

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
    console.log(JSON.stringify(error, null, 2))
    return (
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 23, color: 'red'}}>{ JSON.stringify(error, null, 2) }</Text>
      </View>
    )
  }

  if (successAdd) {
    return (
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 23, color: 'rgb(97, 236, 97)'}}>Movie updated!</Text>
      </View>
    )
  }
  return (
    <View style={ styles.container }>
      <StatusBar barStyle="light-content" />
      <View style={styles.boxHeader}>
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white'}}>Edit Movie</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Title</Text>
            <TextInput
              value={ title }
              onChangeText={val => setTitle(val)}
              style={styles.input}
              placeholder="Required"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Overview</Text>
            <TextInput
              value={ overview }
              onChangeText={val => setOverview(val)}
              style={styles.input}
              placeholder="Required"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Rating</Text>
            <TextInput
              value={ String(rating) }
              onChangeText={val => setRating(val)}
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

EditMovie.navigationOptions = {
  headerTitle: 'Edit Movie',
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

export default EditMovie
