import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity, StatusBar } from 'react-native'
import AnimatedEllipsis from 'react-native-animated-ellipsis'
import { useMutation } from '@apollo/react-hooks'
import DateTimePicker from "react-native-modal-datetime-picker"
import * as constants from '../../../constants'

import { EDIT_TVSHOW } from '../../../graphql/mutation'
import { FETCH_TVSHOW, FETCH_TVSHOWS } from '../../../graphql/query'

const EditTvShow = ({ navigation }) => {
  const tvShow = navigation.getParam('tvShow', null)

  const [title, setTitle] = useState(tvShow.title)
  const [overview, setOverview] = useState(tvShow.overview)
  const [rating, setRating] = useState(tvShow.rating.toString())
  const [releaseDate, setreleaseDate] = useState(tvShow.release_date)
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

  const [editTvShow, { loading, error } ] = useMutation(EDIT_TVSHOW, {
    onCompleted() {
      setSuccessAdd(true)
     
      setTimeout(() => {
        navigation.navigate('Detail')
        setSuccessAdd(false)
      }, 1000)
    },
    onError() {
      // navigation.navigate('Detail', { dataId: tvShow._id })
      // setTimeout(() => {
      // })
    }
  })

  const submitData = () => {
    editTvShow({
      variables: {
        id: tvShow._id,
        title,
        overview, 
        release_date: releaseDate.toLocaleString(), 
        rating: parseInt(rating)
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
        <Text style={{fontSize: 23, color: 'red'}}>{ JSON.stringify(error, null, 2) }</Text>
      </View>
    )
  }

  if (successAdd) {
    return (
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 23, color: constants.color.primary}}>Tv show updated!</Text>
      </View>
    )
  }
  return (
    <View style={ styles.container }>
      <StatusBar barStyle="light-content" />
      <View style={styles.boxHeader}>
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white'}}>Edit Tv Show</Text>
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

EditTvShow.navigationOptions = {
  headerTitle: 'Edit Tv Show',
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

export default EditTvShow
