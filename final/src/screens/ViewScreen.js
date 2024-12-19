import React, {useContext} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import {Context} from '../context/DiaryContext'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {usePoppinsFonts} from '../components/PoppinsFont'

const ViewScreen = ({navigation}) => {
  const id = navigation.getParam('id')
  const {state, deleteDiaryPost} = useContext(Context)
  const fontLoads = usePoppinsFonts()

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
      {/* header: image on the left with title & ratings on the right */}
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
              {`Overall Rating: ${post.ratings.overall} / 10`}
            </Text>
          )}
          {post.ratings && (
            <View style={styles.ratingsContainer}>
              <Text style={styles.ratingItem}>
                Characters: {post.ratings.characters} / 10
              </Text>
              <Text style={styles.ratingItem}>
                Plot: {post.ratings.plot} / 10
              </Text>
              <Text style={styles.ratingItem}>
                Production: {post.ratings.production} / 10
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* review content */}
      <Text style={styles.content}>{post.content}</Text>

      <View style={styles.actionIcons}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Edit', {id: post.id})}
        >
          <MaterialIcons
            name="edit"
            size={30}
            color="#5C2C2A"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteDiaryPost(post.id)}>
          <MaterialIcons
            name="delete"
            size={30}
            color="#5C2C2A"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFF8E7',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  smallRating: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#666',
  },
  ratingsContainer: {
    marginTop: 15,
  },
  ratingItem: {
    marginBottom: 10,
  },
  content: {
    fontSize: 17,
    fontFamily: 'Poppins',
    lineHeight: 24,
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: 'red',
    textAlign: 'center',
  },
  actionIcons: {
    flexDirection: 'row',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 30,
    right: 10,
  },
  icon: {
    marginLeft: 10,
  },
})

export default ViewScreen
