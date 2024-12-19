import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'

const postReducer = (state, action) => {
  switch (action.type) {
    case 'get_posts':
      return action.payload
    case 'delete_post':
      return state.filter((post) => post.id !== action.payload)
    case 'edit_post':
      return state.map((post) => {
        return post.id === action.payload.id ? action.payload : post
      })
    default:
      return state
  }
}

const getDiaryPosts = (dispatch) => {
  return async () => {
    try {
      const response = await jsonServer.get('/posts')
      dispatch({type: 'get_posts', payload: response.data})
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }
}

const addDiaryPost = (dispatch) => {
  return async (title, content, image, ratings, callback) => {
    try {
      const post = {title, content, image, ratings}
      console.log('Adding post:', post) 
      await jsonServer.post('/posts', post)

      const response = await jsonServer.get('/posts')
      dispatch({type: 'get_posts', payload: response.data})

      if (callback) {
        callback()
      }
    } catch (error) {
      console.error('Error adding post:', error)
    }
  }
}

const deleteDiaryPost = (dispatch) => {
  return async (id) => {
    try {
      await jsonServer.delete(`/posts/${id}`)
      dispatch({type: 'delete_post', payload: id})
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }
}

const editDiaryPost = (dispatch) => {
  return async (id, title, content, image, ratings, callback) => {
    try {
      await jsonServer.put(`/posts/${id}`, {title, content, image, ratings})
      dispatch({
        type: 'edit_post',
        payload: {id, title, content, image, ratings},
      })
      if (callback) {
        callback()
      }
    } catch (error) {
      console.error('Error editing post:', error)
    }
  }
}

export const {Context, Provider} = createDataContext(
  postReducer,
  {
    getDiaryPosts,
    addDiaryPost,
    deleteDiaryPost,
    editDiaryPost,
  },
  []
)
