import React from 'react'
import { View, StyleSheet, ActivityIndicator} from 'react-native'
// import * as constants from '../constants'

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"  
  }
})

export default Loader