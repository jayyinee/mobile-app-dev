import React, {useState} from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          {/* image upload */}
          <Text style={styles.label}>Movie/Series Image:</Text>
          <View
            style={[
              styles.imageContainerExpanded,
              !image && styles.imageContainerOriginal,
            ]}
          >
            <TouchableOpacity
              onPress={pickImage}
              style={[
                styles.imagePickerExpanded,
                !image && styles.imagePickerOriginal,
              ]}
            >
              {image ? (
                <Image
                  source={{uri: image}}
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.imagePickerContent}>
                  <Feather name="upload" size={24} color="black" />
                  <Text style={styles.imagePickerText}>Choose File</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Rest of the form remains the same */}
          <Text style={styles.label}>Title:</Text>
          <TextInput
            autoCorrect={false}
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder="Movie/Series Title"
          />

          <Text style={styles.label}>Ratings:</Text>
          <View style={styles.ratingsContainer}>
            <View style={styles.ratingItem}>
              <Text style={styles.ratingItemLabel}>Characters:</Text>
              <TextInput
                style={styles.ratingInput}
                keyboardType="numeric"
                value={ratings.characters.toString()}
                onChangeText={(text) => updateRating('characters', text)}
                maxLength={2}
              />
            </View>
            <View style={styles.ratingItem}>
              <Text style={styles.ratingItemLabel}>Plot:</Text>
              <TextInput
                style={styles.ratingInput}
                keyboardType="numeric"
                value={ratings.plot.toString()}
                onChangeText={(text) => updateRating('plot', text)}
                maxLength={2}
              />
            </View>
            <View style={styles.ratingItem}>
              <Text style={styles.ratingItemLabel}>Production:</Text>
              <TextInput
                style={styles.ratingInput}
                keyboardType="numeric"
                value={ratings.production.toString()}
                onChangeText={(text) => updateRating('production', text)}
                maxLength={2}
              />
            </View>
          </View>

          <Text style={styles.overallRating}>
            Overall Rating: {calculateOverallRating()} / 10
          </Text>

          <Text style={styles.label}>Review:</Text>
          <TextInput
            autoCorrect={false}
            style={styles.input}
            value={content}
            onChangeText={(text) => setContent(text)}
            multiline
            placeholder="Write your review here"
          />

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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#5C2C2A',
    marginVertical: 10,
  },
  input: {
    fontSize: 14,
    fontFamily: 'Poppins',
    borderWidth: 2,
    borderColor: '#5C2C2A',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  imagePickerExpanded: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderWidth: 2,
    borderColor: '#5C2C2A',
    borderRadius: 5,
  },
  imagePickerOriginal: {
    height: 'auto',
  },
  imageContainerExpanded: {
    height: 200,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  imageContainerOriginal: {
    height: 'auto',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  imagePickerText: {
    fontFamily: 'Poppins',
    color: '#555',
    marginLeft: 8,
  },
  ratingsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  ratingItemLabel: {
    fontFamily: 'Poppins',
  },
  ratingInput: {
    width: 50,
    height: 35,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    borderWidth: 2,
    borderColor: '#5C2C2A',
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  overallRating: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#333',
    textAlign: 'center',
    marginVertical: 15,
  },
  button: {
    marginTop: 30,
    marginBottom: 50,
    backgroundColor: '#5C2C2A',
    paddingVertical: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default PostForm
