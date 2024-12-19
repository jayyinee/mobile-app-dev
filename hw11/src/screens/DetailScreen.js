import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native'
import yelp from '../api/yelp'
import {StarRatingDisplay} from 'react-native-star-rating-widget'

const DetailScreen = ({navigation}) => {
  const id = navigation.getParam('id')
  const [result, setResult] = useState(null)

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await yelp.get(`/${id}`)
        setResult(response.data)
      } catch (err) {
        console.error('Error fetching restaurant details:', err)
      }
    }
    fetchResult()
  }, [id])

  const formatTime = (time) => {
    const hours = Math.floor(time / 100)
    const minutes = time % 100
    const period = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    return `${formattedHours}:${formattedMinutes} ${period}`
  }

  const openInMaps = (address) => {
    const query = encodeURIComponent(address.join(', '))
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`
    Linking.openURL(url)
  }

  if (!result) return <Text>Loading...</Text>

  return (
    <ScrollView style={styles.container}>
      {/* Thumbnail Image */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: result.image_url}} />
        <View style={styles.overlay}>
          <Text style={styles.name}>{result.name}</Text>
          <View style={styles.ratingContainer}>
            <StarRatingDisplay rating={result.rating} starSize={20} />
            <Text style={styles.ratingText}>
              {result.rating} ({result.review_count} reviews)
            </Text>
          </View>
        </View>
      </View>

      {/* Price Range & Categories */}
      {result.price && (
        <Text style={styles.text}>
          {result.price} • {result.categories.map((cat) => cat.title).join(', ')}
        </Text>
      )}

      {/* Address */}
      <TouchableOpacity
        onPress={() => openInMaps(result.location.display_address)}
      >
        <Text style={styles.link}>
          {result.location.display_address.join(', ')}
        </Text>
      </TouchableOpacity>

      {/* Phone Number */}
      <TouchableOpacity
        onPress={() => Linking.openURL(`tel:${result.display_phone}`)}
      >
        <Text style={styles.link}>{result.display_phone}</Text>
      </TouchableOpacity>

      {/* Hours of Operation */}
      {result.hours && (
        <View>
          <Text style={styles.hoursHeader}>Operating Hours:</Text>
          {dayNames.map((dayName, index) => {
            const openHours = result.hours[0].open.filter(
              (hour) => hour.day === index
            )
            return (
              <Text key={index} style={styles.hour}>
                {openHours.length > 0
                  ? `${dayName}: ${openHours
                      .map(
                        (hour) =>
                          `${formatTime(hour.start)} - ${formatTime(hour.end)}`
                      )
                      .join(', ')}`
                  : `${dayName}: Closed`}
              </Text>
            )
          })}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'left',
  },
  ratingText: {
    color: '#fff',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  link: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  hoursHeader: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  hour: {
    fontSize: 16,
  },
})

export default DetailScreen