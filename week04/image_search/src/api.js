import axios from 'axios'

const searchImages = async (term) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    // inside headers you use ACCESS KEY
    headers: {Authorization: 'Client-ID FriEqSYENX7cQr68nQgmRfonHz7hPm9TrQbdiUqy1Tg',
  },
  params: {query: term},
  })
  console.log(response.data.results)
  return response.data.results
}

export default searchImages