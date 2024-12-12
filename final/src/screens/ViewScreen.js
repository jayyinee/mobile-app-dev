import React, {useContext} from 'react'
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native'
import {Context} from '../context/DiaryContext'

const ViewScreen = ({navigation}) => {
  const id = navigation.getParam('id')
  const {state} = useContext(Context)

  const post = state.find((diaryPost) => diaryPost.id === id)

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Post not found.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* header: image on the left with title & ratings on the */}
      <View style={styles.headerContainer}>
        {post.image && (
          <Image
            source={{uri: post.image}}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{post.title}</Text>
          {post.ratings && (
            <Text style={styles.smallRating}>
              {`Overall Rating: ${post.ratings.overall}/10`}
            </Text>
          )}

          {post.ratings && (
            <View style={styles.ratingsContainer}>
              <View style={styles.ratingItem}>
                <Text>Characters: {post.ratings.characters}/10</Text>
              </View>
              <View style={styles.ratingItem}>
                <Text>Plot: {post.ratings.plot}/10</Text>
              </View>
              <View style={styles.ratingItem}>
                <Text>Production: {post.ratings.production}/10</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* review content */}
      <Text style={styles.content}>{post.content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    // marginBottom: 10,
  },
  image: {
    width: 100, 
    height: 150,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  smallRating: {
    fontSize: 16,
    color: '#666',
  },
  ratingsContainer: {
    marginVertical: 15,
  },
  ratingItem: {
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
})

export default ViewScreen
