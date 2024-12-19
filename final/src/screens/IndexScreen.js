import React, {useContext, useEffect} from 'react'
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

const IndexScreen = ({navigation}) => {
  const {state, deleteDiaryPost, getDiaryPosts} = useContext(Context)

  useEffect(() => {
    getDiaryPosts()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={state}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('View', {id: item.id})}
          >
            <View style={styles.entryCard}>
              {item.image && (
                <Image source={{uri: item.image}} style={styles.thumbnail} />
              )}
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                {item.ratings && (
                  <Text
                    style={styles.rating}
                  >{`(${item.ratings.overall})`}</Text>
                )}
              </View>
              <View style={styles.actionIcons}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Edit', {id: item.id})}
                >
                  <MaterialIcons
                    name="edit"
                    size={24}
                    color="#5C2C2A"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteDiaryPost(item.id)}>
                  <MaterialIcons
                    name="delete"
                    size={24}
                    color="#5C2C2A"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

IndexScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <MaterialIcons
          style={styles.addIcon}
          name="add"
          size={30}
          color="#5C2C2A"
        />
      </TouchableOpacity>
    ),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#5C2C2A',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#666',
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 6,
  },
  addIcon: {
    marginRight: 10,
  },
})

export default IndexScreen
