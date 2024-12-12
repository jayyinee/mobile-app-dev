import React, {useContext, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {Context} from '../context/DiaryContext'

const IndexScreen = ({navigation}) => {
  const {state, addDiaryPost, deleteDiaryPost} = useContext(Context)
  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('View', {id: item.id})}
          >
            <View style={styles.row}>
              {item.image && (
                <Image source={{uri: item.image}} style={styles.thumbnail} />
              )}
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  {item.title}
                  {item.ratings && (
                    <Text style={styles.rating}>
                      {` (${item.ratings.overall})`}
                    </Text>
                  )}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteDiaryPost(item.id)}>
                <MaterialIcons name="delete" size={24} color="#333" />
              </TouchableOpacity>
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
          color="#666"
        />
      </TouchableOpacity>
    ),
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#666',
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    flexWrap: 'wrap',
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  addIcon: {
    marginRight: 10,
  },
})

export default IndexScreen
