import React, {useState} from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Feather from '@expo/vector-icons/Feather'

const PostForm = ({
  onSubmit,
  inititalValues = {
    title: '',
    content: '',
    image: null,
    ratings: {characters: '', plot: '', production: ''},
  },
}) => {
  const [title, setTitle] = useState(inititalValues.title)
  const [content, setContent] = useState(inititalValues.content)
  const [image, setImage] = useState(inititalValues.image)
  const [ratings, setRatings] = useState(inititalValues.ratings)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const updateRating = (category, value) => {
    if (value === '' || /^\d+$/.test(value)) {
      setRatings((prev) => ({
        ...prev,
        [category]:
          value === '' ? '' : Math.min(10, Math.max(0, Number(value))),
      }))
    }
  }

  const calculateOverallRating = () => {
    const {characters, plot, production} = ratings
    return ((characters + plot + production) / 3).toFixed(1)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* image upload */}
        <Text style={styles.label}>Movie/Series Image:</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {image ? (
              <Image
                source={{uri: image}}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.imagePickerText}>
                <Feather name="upload" size={24} color="black" /> Choose File
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* movie title */}
        <Text style={styles.label}>Title:</Text>
        <TextInput
          autoCorrect={false}
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Movie/Series Title"
        />

        {/* ratings */}
        <Text style={styles.label}>Ratings:</Text>
        <View style={styles.ratingsContainer}>
          <View style={styles.ratingItem}>
            <Text>Characters:</Text>
            <TextInput
              style={styles.ratingInput}
              keyboardType="numeric"
              value={ratings.characters.toString()}
              onChangeText={(text) => updateRating('characters', text)}
              maxLength={2}
            />
          </View>
          <View style={styles.ratingItem}>
            <Text>Plot:</Text>
            <TextInput
              style={styles.ratingInput}
              keyboardType="numeric"
              value={ratings.plot.toString()}
              onChangeText={(text) => updateRating('plot', text)}
              maxLength={2}
            />
          </View>
          <View style={styles.ratingItem}>
            <Text>Production:</Text>
            <TextInput
              style={styles.ratingInput}
              keyboardType="numeric"
              value={ratings.production.toString()}
              onChangeText={(text) => updateRating('production', text)}
              maxLength={2}
            />
          </View>
        </View>

        {/* review content */}
        <Text style={styles.label}>Review:</Text>
        <TextInput
          autoCorrect={false}
          style={styles.input}
          value={content}
          onChangeText={(text) => setContent(text)}
          multiline
          placeholder="Write your review here"
        />

        {/* overall rating */}
        <Text style={styles.overallRating}>
          Overall Rating: {calculateOverallRating()}/10
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onSubmit(title, content, image, {
              characters: ratings.characters,
              plot: ratings.plot,
              production: ratings.production,
              overall: calculateOverallRating(),
            })
          }}
        >
          <Text style={styles.buttonText}>Save Review</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#666',
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 5,
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imagePickerText: {
    color: '#666',
  },
  ratingsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingInput: {
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 5,
    width: 50,
    height: 30,
    marginLeft: 10,
    textAlign: 'center',
  },
  overallRating: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6495ED',
    paddingVertical: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default PostForm
