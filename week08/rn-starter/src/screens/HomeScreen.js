import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.text}>Hello Mobile</Text>
      <Text style={styles.text}>This is some more text</Text>
    </View>
  )
}

const styles = StyleSheet.create({ // write in Javascript, camelCase and in string
  text: {
    fontSize: 30,
    color: 'red',
  },
})

export default HomeScreen
